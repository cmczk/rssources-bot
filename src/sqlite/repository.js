import { storage } from './storage.js'

export const createUser = storage.prepare(`
INSERT INTO
  users (tg_id, username, created_at)
VALUES
  (?, ?, datetime('now'))
RETURNING
  username;
`)

export const getUserByTgId = storage.prepare(`
SELECT username
FROM users
WHERE tg_id = ?  
`)

export const deleteUser = storage.prepare(`
DELETE FROM users WHERE tg_id = ?;  
`)

export const createRssource = storage.prepare(`
INSERT INTO
  rssources (rssources_owner, title, description, tag, url, created_at)
VALUES
  (?, ?, ?, ?, ?, datetime('now'))
RETURNING
  title, description, tag, url;
`)

export const getAllRssources = storage.prepare(`
SELECT id, rssources_owner, title, description, tag, url
FROM rssources
WHERE rssources_owner = ?;
`)

export const getRssourcesByTag = storage.prepare(`
SELECT id, rssources_owner, title, description, tag, url
FROM rssources
WHERE rssources_owner = ? AND tag = ?;
`)

export const getRssource = storage.prepare(`
SELECT id, rssources_owner, title, description, tag, url
FROM rssources
WHERE rssources_owner = ? AND url = ?
LIMIT 1;
`)

export const deleteRssource = storage.prepare(`
DELETE FROM rssources WHERE rssources_owner = ? AND url = ?;  
`)

export const createArticle = storage.prepare(`
INSERT INTO
  articles (rssource_id, title, description, url, pub_date, created_at)
VALUES
  (?, ?, ?, ?, ?, datetime('now')); 
`)

export const getLatestArticleInfo = storage.prepare(`
WITH latest_date AS
(
  SELECT user_id, rssource_id, MAX(pub_date) AS pub_date
  FROM articles
  GROUP BY user_id, rssource_id
)

SELECT
    la.user_id AS tg_id
  , r.title AS rss_title
  , r.url AS rss_url
  , la.pub_date AS art_pub_date
FROM
  latest_articles as la
INNER JOIN
  rssources as r
ON
  la.rssource_id = r.id
`)
