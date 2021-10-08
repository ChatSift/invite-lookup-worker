import {
  DiscordFetchErrorResponse,
  InvalidInviteResponse,
  OutOfRetriesResponse,
  UnexpectedErrorResponse
} from './responses';

export const fetchDiscord = async (code: string, retries = 0): Promise<string | Response> => {
  const discordRes = await fetch(`https://discord.com/api/v9/invites/${code}`).catch(e => console.error(e));
  if (!discordRes) {
    return new DiscordFetchErrorResponse();
  }

  if (discordRes.status === 404) {
    await INVITES.put(code, 'NOOP', { expirationTtl: 60 });
    return new InvalidInviteResponse();
  } else if (discordRes.status === 500) {
    if (retries++ === 3) {
      return new OutOfRetriesResponse();
    }

    await new Promise(resolve => setTimeout(resolve, 250));
    return fetchDiscord(code, retries);
  } else if (!discordRes.ok) {
    const data = await discordRes
      .json()
      .catch(() => discordRes.clone().text())
      .catch(() => null);

    console.error('Non 2xx response from Discord', { data, status: discordRes.status, statusText: discordRes.statusText });

    return new UnexpectedErrorResponse();
  }

  // Want raw text over JSON
  return discordRes.text();
};
