import { storage } from './storage.js'

export const createUser = storage.prepare(`
insert into
  users (tg_id, username, created_at)
values
  (?, ?, datetime('now'))
returning
  username;
`)

export const getUserByTgId = storage.prepare(`
select username
from users
where tg_id = ?  
`)

export const deleteUser = storage.prepare(`
delete from users where tg_id = ?;  
`)

export const createRssource = storage.prepare(`
insert into
  rssources (rssources_owner, title, description, tag, url, created_at)
values
  (?, ?, ?, ?, ?, datetime('now'))
returning
  title, description, tag, url;
`)

export const getAllRssources = storage.prepare(`
select id, rssources_owner, title, description, tag, url
from rssources
where rssources_owner = ?;
`)

export const getRssourcesByTag = storage.prepare(`
select id, rssources_owner, title, description, tag, url
from rssources
where rssources_owner = ? and tag = ?;
`)

export const getRssource = storage.prepare(`
select id, rssources_owner, title, description, tag, url
from rssources
where rssources_owner = ? and url = ?
limit 1;
`)

export const deleteRssource = storage.prepare(`
delete from rssources where rssources_owner = ? and url = ?;  
`)

export const createArticle = storage.prepare(`
insert into
  articles (rssource_id, title, description, url, pub_date, created_at)
values
  (?, ?, ?, ?, ?, datetime('now')); 
`)

export const getLatestArticleInfo = storage.prepare(`
with latest_article as
(
  select user_id, rssource_id, max(pub_date) as pub_date
  from articles
  group by user_id, rssource_id
)

select
    la.user_id as tg_id
  , r.title as rss_title
  , r.url as rss_url
  , la.pub_date as art_pub_date
from
  latest_article as la
inner join
  rssources as r
on
  la.rssource_id = r.id
`)
