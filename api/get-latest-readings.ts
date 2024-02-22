import type { VercelRequest, VercelResponse } from '@vercel/node';
import Parser from 'rss-parser';

export default async function (_: VercelRequest, response: VercelResponse) {
  const parser = new Parser();
  const feed = await parser.parseURL(
    'https://www.goodreads.com/review/list_rss/38757922?key=GREoInDkWGpnD1xKT_4HCeieuQ65yghCmQYJNOGv6Ody2J5J&shelf=currently-reading'
  );

  response.status(200).json(feed.items);
}
