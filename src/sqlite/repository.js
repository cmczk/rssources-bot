import { storage } from './storage.js'

export const createUser = storage.prepare(`
INSERT INTO
  users (username, created_at)
VALUES
  (?, datetime('now'));  
`)

export const createRssource = storage.prepare(`
INSERT INTO
  rssources (rssources_owner, title, tag, url, created_at, updated_at)
VALUES
  (?, ?, ?, ?, datetime('now'), datetime('now'));  
`)
