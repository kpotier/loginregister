package gorm

import (
	"sync"
	"time"

	"github.com/kpotier/loginregister/pkg/locale"
	"github.com/kpotier/loginregister/pkg/store"

	"gorm.io/gorm"
)

type ConfigStore struct {
	db         *gorm.DB
	cache      *store.Config
	emailcache []*store.ConfigEmail

	mux        sync.RWMutex
	update     time.Duration
	lastUpdate time.Time
}

func NewConfigStore(db *gorm.DB) (store.ConfigStore, error) {
	if err := db.AutoMigrate(&store.Config{}, &store.ConfigEmail{}); err != nil {
		return nil, err
	}

	// Populate config if it doesn't exist.
	var count int64
	cfg := store.DefaultConfig()
	err := db.Model(&store.Config{}).Count(&count).Error
	if err != nil {
		return nil, err
	}
	if count == 0 {
		if err := db.Create(cfg).Error; err != nil {
			return nil, err
		}
	}
	// Populate emails if they do not exist.
	emails := store.DefaultConfigEmail()
	err = db.Model(&store.ConfigEmail{}).Count(&count).Error
	if err != nil {
		return nil, err
	}
	if count == 0 {
		for _, e := range emails {
			if err := db.Create(e).Error; err != nil {
				return nil, err
			}
		}
	}

	return &ConfigStore{db: db, cache: cfg, emailcache: emails}, err
}

func (c *ConfigStore) updateCache() error {
	now := time.Now()
	c.mux.Lock()
	defer c.mux.Unlock()
	if c.lastUpdate.Add(c.update).Before(now) {
		tx := c.db.Begin()
		if err := tx.Take(c.cache).Error; err != nil {
			return err
		}
		if err := tx.Find(&c.emailcache).Error; err != nil {
			return err
		}
		if err := tx.Commit().Error; err != nil {
			return err
		}
		c.lastUpdate = now
		c.update = c.cache.ConfigCacheDuration
	}
	return nil
}

func (c *ConfigStore) ConfigGet() (*store.Config, error) {
	err := c.updateCache()
	c.mux.RLock()
	cfg := *c.cache
	c.mux.RUnlock()
	return &cfg, err
}

func (c *ConfigStore) ConfigUpdate(cfg *store.Config) error {
	err := c.db.Save(cfg).Error
	if err == nil {
		c.mux.Lock()
		c.cache = cfg
		c.mux.Unlock()
	}
	return err
}

func (c *ConfigStore) EmailGetAll() ([]*store.ConfigEmail, error) {
	err := c.updateCache()
	c.mux.RLock()
	defer c.mux.RUnlock()
	emails := make([]*store.ConfigEmail, len(c.emailcache))
	for i, e := range c.emailcache {
		email := *e
		emails[i] = &email
	}
	return emails, err
}

func (c *ConfigStore) EmailGet(t store.ConfigEmailType) (*store.ConfigEmail, error) {
	err := c.updateCache()
	if err != nil {
		return nil, err
	}
	c.mux.RLock()
	defer c.mux.RUnlock()
	for _, e := range c.emailcache {
		if e.Type == t {
			email := *e
			return &email, nil
		}
	}
	return nil, store.ErrNotFound
}

func (c *ConfigStore) EmailUpdate(t store.ConfigEmailType, content locale.Message) error {
	e := &store.ConfigEmail{Type: t, Content: content}
	err := c.db.Select("*").Updates(e).Error
	if err == nil {
		c.mux.Lock()
		defer c.mux.Unlock()
		found := -1
		for i, er := range c.emailcache {
			if er.Type == e.Type {
				found = i
				break
			}
		}
		if found != -1 {
			c.emailcache[found] = e
		}
	}
	return err
}
