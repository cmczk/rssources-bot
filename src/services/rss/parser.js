import Parser from 'rss-parser'

const parser = new Parser()

export const getLatestArticle = async (url) => {
  const feed = await parser.parseURL(url)

  const latestArticle = feed.items.reduce((latest, item) => {
    return new Date(item.pubDate) > new Date(latest.pubDate) ? item : latest
  })

  return {
    author: latestArticle.creator || 'Unknown',
    title: latestArticle.title,
    link: latestArticle.link,
    pubDate: latestArticle.pubDate,
  }
}
