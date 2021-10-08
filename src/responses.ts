export class JsonResponse extends Response {
  public constructor(body?: BodyInit | null, init?: ResponseInit) {
    super(body, Object.assign(init, {
      headers: {
        'Content-Type': 'application/json'
      }
    }));
  }
}

export class DiscordFetchErrorResponse extends JsonResponse {
  public constructor() {
    super(JSON.stringify({ message: 'An I/O error occured while fetching Discord' }), { status: 500 });
  }
}

export class InvalidInviteResponse extends JsonResponse {
  public constructor() {
    super(JSON.stringify({ message: 'No invite matches that code' }), { status: 404 });
  }
}

export class OutOfRetriesResponse extends JsonResponse {
  public constructor() {
    super(JSON.stringify({ message: 'Attempted to fetch the data 3 times, but got a 500 from Discord each time' }), { status: 500 });
  }
}

export class UnexpectedErrorResponse extends JsonResponse {
  public constructor() {
    super(JSON.stringify({ message: 'Unexpected non-2xx status while fetching Discord' }), { status: 500 });
  }
}
