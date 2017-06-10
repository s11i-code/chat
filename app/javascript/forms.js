import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';
import { getMessagesUrl } from './utils/urls';

export function createMessage(roomId, content, username) {
  const url = getMessagesUrl(roomId);
  const body = { content, user: username };
  const observable = Observable
    .ajax({ method: 'POST', url, body })
    .retry(3);
  return observable.map(e => e.response);
}
