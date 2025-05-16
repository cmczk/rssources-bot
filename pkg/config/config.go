package config

import (
	"flag"
	"log"
)

var (
	botAPIToken = flag.String("bot-api-token", "", "token to access Telegram Bot API")
	strorageURL = flag.String("storage-url", "", "url to connect to db")
)

func init() {
	flag.Parse()
}

func MustToken() (t string) {
	t = *botAPIToken
	mustBeNotEmpty(t, "can't read bot api token")
	return
}

func MustStorageURL() (u string) {
	u = *strorageURL
	mustBeNotEmpty(u, "can't read storage url")
	return
}

func mustBeNotEmpty(s string, msgIfEmpty string) {
	if s == "" {
		log.Fatal(msgIfEmpty)
	}
}
