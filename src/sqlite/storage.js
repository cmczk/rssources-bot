import { DatabaseSync } from 'node:sqlite'

export const storage = new DatabaseSync(
  `${import.meta.dirname}/rssources_bot.db`,
)

const initialSql = `
create table if not exists users (
    id integer primary key
  , tg_id integer not null unique 
  , username text not null
  , created_at text not null
);

create table if not exists rssources (
    id integer primary key
  , rssources_owner integer not null 
  , title text not null
  , description text
  , tag text not null
  , url text not null
  , created_at text not null

  , foreign key (rssources_owner) references users (tg_id) on delete cascade
);

create table if not exists articles (
    id integer primary key
  , user_id integer not null
  , rssource_id integer not null 
  , title text not null
  , description text
  , url text not null
  , pub_date text not null
  , created_at text not null

  , foreign key (user_id) references users (tg_id) on delete cascade
  , foreign key (rssource_id) references rssources (id) on delete cascade
);
`

storage.exec(initialSql)
