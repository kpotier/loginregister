package gorm_test

import (
	"math"
	"path/filepath"
	"testing"
	"time"

	"gorm.io/driver/sqlite"
	gormDB "gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func newDB(t *testing.T) *gormDB.DB {
	tempDir := t.TempDir()
	db, err := gormDB.Open(sqlite.Open(filepath.Join(tempDir, "t.db")), &gormDB.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		panic(err)
	}
	return db
}

func isUpdated(t *time.Time, t2 *time.Time) bool {
	if t.Equal(*t2) {
		return false
	}
	if math.Abs(float64(time.Until(*t))) < float64(30*time.Second) {
		*t2 = *t
		return true
	}
	return false
}
