import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

import profile from '../../content/profile.js';

export default async function (_: GatsbyFunctionRequest, response: GatsbyFunctionResponse) {
  if (!profile.feeds.discogs_collection_folder_api) {
    const message = 'You need to set `discogs_collection_folder_api` variable to use this resource.';
    console.error(message);

    return response.status(500).json({ message });
  }

  const discogs_response = await fetch(profile.feeds.discogs_collection_folder_api);
  const discogs_data = await discogs_response.json();

  const title = discogs_data.releases[0].basic_information.title;
  const artist = discogs_data.releases[0].basic_information.artists[0].name;

  const message = `Now I'm collecting vinyl records, and the latest addition to my collection was: "${title}" by ${artist}`;

  response.status(200).json({ message });
}
