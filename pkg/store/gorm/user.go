package gorm

import (
	"time"

	"github.com/kpotier/loginregister/pkg/store"

	"gorm.io/gorm"
)

type UserStore struct {
	db *gorm.DB
}

func NewUserStore(db *gorm.DB) (store.UserStore, error) {
	err := db.AutoMigrate(&store.User{}, &store.UserRefresh{}, &store.UserCode{})
	return &UserStore{db}, err
}

func (c *UserStore) UserSet(user *store.User) error {
	return c.db.Create(user).Error
}

func (c *UserStore) UserGet(id uint32) (*store.User, error) {
	var u store.User
	err := c.db.Where("id = ?", id).Take(&u).Error
	return &u, gormReplaceErr(err)
}

func (c *UserStore) UserGetByEmail(email string) (*store.User, error) {
	var u store.User
	r := c.db.Where("email = ?", email).Limit(1).Find(&u)
	err := r.Error
	if err == nil && r.RowsAffected != 1 {
		err = store.ErrNotFound
	}
	return &u, err
}

func (c *UserStore) UserGetAllWithDeleted(limit, offset int) ([]*store.User, error) {
	var us []*store.User
	err := c.db.Unscoped().Limit(limit).Offset(offset).Find(&us).Error
	return us, err
}

func (c *UserStore) UserUpdate(id uint32, fields []string, u *store.User) error {
	return c.db.Where("id = ?", id).Select(fields).Updates(u).Error
}

func (c *UserStore) UserDelete(id uint32) error {
	return c.db.Delete(&store.User{}, id).Error
}

func (c *UserStore) RefreshSet(refresh *store.UserRefresh) error {
	return c.db.Create(refresh).Error
}

func (c *UserStore) RefreshGet(userID uint32, token []byte) (*store.UserRefresh, error) {
	var r store.UserRefresh
	err := c.db.Where("token = ?", token).Take(&r).Error
	return &r, gormReplaceErr(err)
}

func (c *UserStore) RefreshGetAll(userID uint32) ([]*store.UserRefresh, error) {
	var rs []*store.UserRefresh
	return rs, c.db.Where("user_id = ?", userID).Order("datetime(\"created_at\") DESC").Find(&rs).Error
}

func (c *UserStore) RefreshDelete(userID uint32, tokens ...[]byte) error {
	return c.db.Where("token IN ?", tokens).Delete(&store.UserRefresh{}).Error
}

func (c *UserStore) RefreshDeleteAll(userID uint32) error {
	return c.db.Where("user_id = ?", userID).Delete(&store.UserRefresh{}).Error
}

func (c *UserStore) RefreshGetAllWithDelete(limit int, offset int) ([]*store.UserRefresh, error) {
	var us []*store.UserRefresh
	err := c.db.Unscoped().Limit(limit).Offset(offset).Find(&us).Error
	return us, err
}

func (c *UserStore) CodeSet(uc *store.UserCode) error {
	return c.db.Create(uc).Error
}

func (c *UserStore) CodeGet(t store.UserCodeType, email string, code string) (*store.UserCode, error) {
	var uc store.UserCode
	err := c.db.Where("code = ?", code).Take(&uc).Error
	return &uc, gormReplaceErr(err)
}

func (c *UserStore) CodeGetAll(t store.UserCodeType, email string) ([]*store.UserCode, error) {
	var uc []*store.UserCode
	err := c.db.Where("type = ? AND email = ?", t, email).Take(&uc).Error
	return uc, gormReplaceErr(err)
}

func (c *UserStore) CodeDelete(t store.UserCodeType, email string, code string) error {
	return c.db.Delete(&store.UserCode{}, "code", code).Error
}

func (c *UserStore) CodeDeleteAll(t store.UserCodeType, email string) error {
	return c.db.Where("email = ? AND type = ?", email, t).Delete(&store.UserCode{}).Error
}

func (c *UserStore) CodeDeleteExp() error {
	return c.db.Where("datetime(exp) < datetime(?)", time.Now()).Delete(&store.UserCode{}).Error
}
