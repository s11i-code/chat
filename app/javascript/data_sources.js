import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import { getMessagesUrl, getRoomsUrl } from './utils/urls';

const MESSAGES_POLL_INTERVAL = 1000;

export function getMessagesSource(roomId) {
  const observable = Observable.ajax(getMessagesUrl(roomId));
  const source = Observable.interval(MESSAGES_POLL_INTERVAL)
    .flatMap(() => observable);

  return source.map(e => e.response);
}

export function getRoomsSource() {
  const observable = Observable
    .ajax(getRoomsUrl())
    .take(1);

  return observable.map(e => e.response);
}
