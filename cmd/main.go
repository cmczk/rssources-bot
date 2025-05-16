package main

import (
	"context"
	"fmt"
	"log"

	"github.com/cmczk/rssources-bot/pkg/config"
	"github.com/mymmrac/telego"
	tu "github.com/mymmrac/telego/telegoutil"
)

func main() {
	t := config.MustToken()
	_ = config.MustStorageURL()
	ctx := context.Background()

	bot, err := telego.NewBot(t, telego.WithDefaultDebugLogger())
	if err != nil {
		log.Fatal(err.Error())
	}

	updates, err := bot.UpdatesViaLongPolling(ctx, nil)
	if err != nil {
		fmt.Printf("error while long polling: %s", err.Error())
	}

	for u := range updates {
		fmt.Printf("%+v\n", u)

		if u.Message != nil {
			chatID := u.Message.Chat.ID

			_, _ = bot.SendMessage(
				ctx,
				tu.Message(
					tu.ID(chatID),
					u.Message.Text,
				),
			)
		}
	}
}
