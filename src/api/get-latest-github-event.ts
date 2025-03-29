import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

import profile from '../../content/profile.js';

export default async function (_: GatsbyFunctionRequest, response: GatsbyFunctionResponse) {
  if (!profile.feeds.github_events) {
    const message = 'You need to set `github_events` variable to use this resource.';
    console.error(message);

    return response.status(500).json({ message });
  }

  const github_response = await fetch(profile.feeds.github_events);
  const github_data = await github_response.json();

  const latest_status_content = github_data[0].repo.name;
  const latest_status_date = new Date(github_data[0].created_at).toLocaleDateString('en-us', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const message = `My most recently updated repository was '${latest_status_content}' on ${latest_status_date}.`;

  response.status(200).json({ message });
}
