import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import Parser from 'rss-parser';

import { feeds } from '@content/profile.json';

export default async function (_: GatsbyFunctionRequest, response: GatsbyFunctionResponse) {
  if (!feeds.letterboxd) {
    const message = 'You need to set LETTERBOXD_RSS env variable to use this resource.';
    console.error(message);

    return response.status(500).json({ message });
  }

  const parser = new Parser();
  const feed = await parser.parseURL(feeds.letterboxd);

  const message = `I watched ${feed.items.length} movies recently, would you like to recommend one?`;

  response.status(200).json({ message });
}
