## Run script example

```bash
go run ./cmd/main.go -bot-api-token SOME_TOKEN -storage-url SOME_STORAGE_URL
```

## Create new migration with goose

```bash
goose create -dir ./data/migrations/ create_tables sql
```

## Apply migration

```bash
 GOOSE_DRIVER=sqlite3 GOOSE_DBSTRING=./path/to/file.db goose up
```
