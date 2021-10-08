import { Router } from 'itty-router';
import { fetchDiscord } from './fetchDiscord';
import { handleError } from './handleError';
import { DiscordFetchErrorResponse, JsonResponse } from './responses';

const router = Router();

const respondWithInvite = (invite: string) => {
  if (invite === 'NOOP') {
    return new DiscordFetchErrorResponse();
  }

  return new JsonResponse(invite, { status: 200 });
};

router.get!('/invites/:code', async req => {
  const { code } = req.params as { code: string };

  const existing = await INVITES.get(code);
  if (existing) {
    return respondWithInvite(existing);
  }

  const invite = await fetchDiscord(code);
  if (invite instanceof Response) {
    return invite;
  }

  const data = JSON.parse(invite);
  const isVanity = data.code === data.guild?.vanity_url_code;
  await INVITES.put(code, invite, { expirationTtl: isVanity ? 3600 : 300 });

  return respondWithInvite(invite);
});

router.delete!('/cache/:code', async req => {
  const { code } = req.params as { code: string };

  const existing = await INVITES.get(code);
  INVITES.delete(code);

  return new JsonResponse(JSON.stringify({ deleted: Boolean(existing) }), { status: 200 });
});

router.all!('*', () => new JsonResponse(JSON.stringify({ message: 'Unknown route' }), { status: 404 }));

addEventListener('fetch', event => {
  event.respondWith(
    router
      .handle(event.request)
      .catch(handleError)
  );
});
