import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import Parser from 'rss-parser';

import profile from '../../content/profile.js';

export default async function (_: GatsbyFunctionRequest, response: GatsbyFunctionResponse) {
  if (!profile.feeds.letterboxd_feed) {
    const message = 'You need to set `letterboxd_feed` variable to use this resource.';
    console.error(message);

    return response.status(500).json({ message });
  }

  const parser = new Parser();
  const feed = await parser.parseURL(profile.feeds.letterboxd_feed);

  const message = `I watched "${feed.items[0].title}" recently. Would you like to recommend a movie?`;

  response.status(200).json({ message });
}
