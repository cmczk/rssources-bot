package sqlite

import (
	"context"
	"database/sql"

	"github.com/cmczk/rssources-bot/lib/e"
	"github.com/cmczk/rssources-bot/pkg/storage"
	_ "github.com/mattn/go-sqlite3"
)

type Storage struct {
	db *sql.DB
}

func New(url string) (*Storage, error) {
	const op = "storage.sqlite.New"

	db, err := sql.Open("sqlite3", url)
	if err != nil {
		return nil, e.Wrap(op, err)
	}

	return &Storage{db: db}, nil
}

func (s *Storage) SaveUser(ctx context.Context, user *storage.User) error {
	const op = "storage.sqlite.SaveUser"

	stmt, err := s.db.PrepareContext(ctx, `INSERT INTO users(id, name) VALUES (?, ?)`)
	if err != nil {
		return e.Wrap(op, err)
	}

	_, err = stmt.ExecContext(ctx, user.ID, user.Name)
	if err != nil {
		return e.Wrap(op, err)
	}

	return nil
}

func (s *Storage) AddResource(ctx context.Context, resource *storage.Resource) error {
	const op = "storage.sqlite.AddResource"

	stmt, err := s.db.PrepareContext(
		ctx,
		`INSERT INTO resources(title, url, user_id)
		 VALUES (?, ?, ?)`,
	)
	if err != nil {
		return e.Wrap(op, err)
	}

	_, err = stmt.ExecContext(ctx, resource.Title, resource.URL, resource.UserID)
	if err != nil {
		return e.Wrap(op, err)
	}

	return nil
}

func (s *Storage) DeleteUser(ctx context.Context, id int) error {
	const op = "storage.sqlite.DeleteUser"

	stmt, err := s.db.PrepareContext(ctx, `DELETE FROM users WHERE id = ?`)
	if err != nil {
		return e.Wrap(op, err)
	}

	_, err = stmt.ExecContext(ctx, id)
	if err != nil {
		return e.Wrap(op, err)
	}

	return nil
}
