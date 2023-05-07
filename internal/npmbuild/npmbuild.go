// Package npmbuild will watch for changes and then run `npm run build`.
package npmbuild

import (
	"io/fs"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/fsnotify/fsnotify"
)

var Stderr = os.Stderr
var Stdout = os.Stdout

// Watch for changes and run `npm run build`. src is the source directory and
// out is the path where the build command will produce the static files. cp
// will copy these files to the desired directory.
func Watch(src, out, cp string) error {
	build(src, out, cp)
	w, err := fsnotify.NewWatcher()
	if err != nil {
		return err
	}
	err = filepath.WalkDir(src, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			w.Add(path)
		}
		return nil
	})
	if err != nil {
		return err
	}
	errCh := make(chan error)
	go func() {
		for {
			select {
			case event := <-w.Events:
				if event.Op != fsnotify.Chmod {
					build(src, out, cp)
				}
			case err := <-w.Errors:
				errCh <- err
				close(errCh)
				return
			}
		}
	}()
	err = <-errCh
	return err
}

func build(src, out, cp string) {
	cmd(src, "npm", "run", "build")
	cmd(".", "rm", "-r", cp)
	cmd(".", "cp", "-r", filepath.Join(out, "."), cp)
}

func cmd(dir string, name string, args ...string) {
	cmd := exec.Command(name, args...)
	cmd.Dir = dir
	cmd.Stderr = Stderr
	cmd.Stdout = Stdout
	cmd.Run()
}
