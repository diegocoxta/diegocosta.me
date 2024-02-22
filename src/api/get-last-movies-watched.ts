import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import Parser from 'rss-parser';

export default async function (_: GatsbyFunctionRequest, response: GatsbyFunctionResponse) {
  if (!process.env.LETTERBOXD_RSS) {
    const message = 'You need to set LETTERBOXD_RSS env variable to use this resource.';
    console.error(message);

    return response.status(500).json({ message });
  }

  const parser = new Parser();
  const feed = await parser.parseURL(process.env.LETTERBOXD_RSS);

  const message = `I watched ${feed.items.length} movies recently, would you like to recommend one?`;

  response.status(200).json({ message });
}
