import { storage } from './storage.js'

export const createUser = storage.prepare(`
INSERT INTO
  users (username, created_at)
VALUES
  (?, datetime('now'));  
`)

export const deleteUser = storage.prepare(`
DELETE FROM users WHERE id = ?;  
`)

export const createRssource = storage.prepare(`
INSERT INTO
  rssources (rssources_owner, title, tag, url, created_at, updated_at)
VALUES
  (?, ?, ?, ?, datetime('now'), datetime('now'));  
`)

export const getAllRssources = storage.prepare(`
SELECT id, rssources_owner, title, tag, url
FROM rssources
WHERE rssources_owner = ?;
`)

export const getRssourcesByTag = storage.prepare(`
SELECT id, rssources_owner, title, tag, url
FROM rssources
WHERE rssources_owner = ? AND tag = ?;
`)

export const deleteRssource = storage.prepare(`
DELETE FROM rssources WHERE rssources_owner = ? AND url = ?;  
`)
