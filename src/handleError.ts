import { JsonResponse } from './responses';

export const handleError = (error: any) => {
  console.error('Unhandled error', error);
  return new JsonResponse(
    JSON.stringify({
      message: error.message ?? 'Internal Server Error'
    }), { status: error.status ?? 500 }
  );
};
