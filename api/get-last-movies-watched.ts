import type { VercelRequest, VercelResponse } from '@vercel/node';
import Parser from 'rss-parser';

export default async function (_: VercelRequest, response: VercelResponse) {
  if (!process.env.LETTERBOXD_RSS) {
    const message = 'You need to set LETTERBOXD_RSS env variable to use this resource.';
    console.error(message);

    return response.status(200).json({ message });
  }

  const parser = new Parser();
  const feed = await parser.parseURL(process.env.LETTERBOXD_RSS);

  const message = `I watched ${feed.items.length} movies recently, would you like to recommend one?`;

  response.status(200).json({ message });
}
