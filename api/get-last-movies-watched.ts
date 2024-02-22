import type { VercelRequest, VercelResponse } from '@vercel/node';
import Parser from 'rss-parser';

export default async function (_: VercelRequest, response: VercelResponse) {
  const parser = new Parser();
  const feed = await parser.parseURL('https://letterboxd.com/diegocoxta/rss/');

  const message = `I watched ${feed.items.length} movies recently, would you like to recommend one?`;

  response.status(200).json({ message });
}
