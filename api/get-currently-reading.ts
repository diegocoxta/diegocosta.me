import type { VercelRequest, VercelResponse } from '@vercel/node';
import Parser from 'rss-parser';

export default async function (_: VercelRequest, response: VercelResponse) {
  if (!process.env.GOODREADS_CURRENTLY_READING_SHELF_RSS) {
    const message = 'You need to set GOODREADS_CURRENTLY_READING_SHELF_RSS env variable to use this resource.';
    console.error(message);

    return response.status(500).json({ message });
  }

  const parser = new Parser();
  const feed = await parser.parseURL(process.env.GOODREADS_CURRENTLY_READING_SHELF_RSS);

  const message =
    feed.items.length <= 0
      ? `I'm not reading any books at the moment, would you like to recommend one?`
      : `I'm currently reading ${feed.items.length} books.`;

  response.status(200).json({ message });
}
