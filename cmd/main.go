package main

import (
	"fmt"

	"github.com/cmczk/rssources-bot/pkg/config"
)

func main() {
	t := config.MustToken()
	su := config.MustStorageURL()

	fmt.Println(t)
	fmt.Println(su)
}
