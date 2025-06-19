import { DatabaseSync } from 'node:sqlite'

export const storage = new DatabaseSync(
  `${import.meta.dirname}/rssources_bot.db`
)

const initialSql = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY
  , tg_id INTEGER NOT NULL
  , username TEXT NOT NULL UNIQUE
  , created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS rssources (
    id TEXT PRIMARY KEY
  , rssources_owner INTEGER NOT NULL 
  , title TEXT NOT NULL
  , tag TEXT NOT NULL
  , url TEXT NOT NULL
  , created_at INTEGER NOT NULL
  , updated_at INTEGER NOT NULL

  , FOREIGN KEY (rssources_owner) REFERENCES users (tg_id) ON DELETE CASCADE
);
`

storage.exec(initialSql)
