package main

import (
	"context"
	"log"

	"github.com/cmczk/rssources-bot/pkg/config"
	"github.com/cmczk/rssources-bot/pkg/storage"
	"github.com/cmczk/rssources-bot/pkg/storage/sqlite"
	_ "github.com/mymmrac/telego/telegoutil"
)

var (
	firstUser      = &storage.User{ID: 123456, Name: "Yauheni"}
	secondUser     = &storage.User{ID: 789123, Name: "Valeryia"}
	firstResource  = &storage.Resource{Title: "New York Times", URL: "nytimes.com", UserID: 123456}
	secondResource = &storage.Resource{Title: "Edvice", URL: "edvice.pro", UserID: 789123}
)

func main() {
	_ = config.MustToken()
	su := config.MustStorageURL()
	ctx := context.Background()

	strg, err := sqlite.New(su)
	if err != nil {
		log.Fatal("can't connect to db")
	}

	strg.SaveUser(ctx, firstUser)
	strg.SaveUser(ctx, secondUser)

	strg.AddResource(ctx, firstResource)
	strg.AddResource(ctx, secondResource)

	// bot, err := telego.NewBot(t, telego.WithDefaultDebugLogger())
	// if err != nil {
	// 	log.Fatal(err.Error())
	// }

	// updates, err := bot.UpdatesViaLongPolling(ctx, nil)
	// if err != nil {
	// 	fmt.Printf("error while long polling: %s", err.Error())
	// }

	// for u := range updates {
	// 	fmt.Printf("%+v\n", u)

	// 	if u.Message != nil {
	// 		chatID := u.Message.Chat.ID

	// 		_, _ = bot.SendMessage(
	// 			ctx,
	// 			tu.Message(
	// 				tu.ID(chatID),
	// 				u.Message.Text,
	// 			),
	// 		)
	// 	}
	// }
}
