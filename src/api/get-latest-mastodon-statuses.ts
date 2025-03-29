import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

import profile from '../../content/profile.js';

export default async function (_: GatsbyFunctionRequest, response: GatsbyFunctionResponse) {
  if (!profile.feeds.mastodon_statuses) {
    const message = 'You need to set `mastodon_statuses` variable to use this resource.';
    console.error(message);

    return response.status(500).json({ message });
  }

  const mastodon_response = await fetch(profile.feeds.mastodon_statuses);
  const mastodon_data = await mastodon_response.json();

  const latest_status_content = mastodon_data[0].content;
  const latest_status_date = new Date(mastodon_data[0].created_at).toLocaleDateString('en-us', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const message = `🗣️ ${latest_status_content} <span>${latest_status_date}</span>`;

  response.status(200).json({ message });
}
