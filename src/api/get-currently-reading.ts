import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import Parser from 'rss-parser';

import profile from '../../content/profile.js';

export default async function (_: GatsbyFunctionRequest, response: GatsbyFunctionResponse) {
  if (!profile.feeds.goodreads_currently_reading_shelf) {
    const message = 'You need to set `goodreads_currently_reading_shelf` variable to use this resource.';
    console.error(message);

    return response.status(500).json({ message });
  }

  const parser = new Parser();
  const feed = await parser.parseURL(profile.feeds.goodreads_currently_reading_shelf);

  let message;

  switch (feed.items.length) {
    case 0:
      message = `I'm not reading any books at the moment. Would you like to recommend a book?`;
      break;
    case 1:
      message = `I'm currently reading "${feed.items[0].title}". Would you like to recommend another?`;
      break;
    default:
      message = `I'm currently reading "${feed.items[0].title}" and other ${feed.items.length} books.`;
  }

  response.status(200).json({ message });
}
