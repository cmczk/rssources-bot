package storage

import "time"

type Storage interface {
	SaveUser(user User) error
	AddResource(resource Resource) error
	GetLatestArticle() (Article, error)
}

type User struct {
	ID   int
	Name string
}

type Resource struct {
	Title  string
	URL    string
	UserID int
}

type Article struct {
	Title       string
	Description string
	URL         string
	PublishedAt time.Time
	ResourceID  int
}
