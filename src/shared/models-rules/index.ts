import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string {
  // TODO: replace with real implementation
  return 'ac3e8519-c329-49a9-a6b4-e966a505bf57';
  // return request.user && request.user.id;
}
