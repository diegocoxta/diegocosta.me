import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

import profile from '../../content/profile.js';

export default async function (_: GatsbyFunctionRequest, response: GatsbyFunctionResponse) {
  if (!profile.feeds.bsky_statuses) {
    const message = 'You need to set `bsky_statuses` variable to use this resource.';
    console.error(message);

    return response.status(500).json({ message });
  }

  const bsky_response = await fetch(profile.feeds.bsky_statuses);
  const bsky_data = await bsky_response.json();

  const latest_status_content = bsky_data.feed[0].post.record.text;
  const latest_status_date = new Date(bsky_data.feed[0].post.record.createdAt).toLocaleDateString('en-us', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const message = `${latest_status_content} <span>${latest_status_date}</span>`;

  response.status(200).json({ message });
}
