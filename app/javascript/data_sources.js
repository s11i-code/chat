import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

const MESSAGES_POLL_INTERVAL = 1000;
const ROOMS_POLL_INTERVAL = 15000;

export function getMessagesSource(roomId) {
  const observable = Observable.ajax(`/rooms/${roomId}/messages.json`);
  const source = Observable.interval(MESSAGES_POLL_INTERVAL)
    .flatMap(() => observable);

  return source.map(e => e.response);
}

export function getRoomsSource() {
  const observable = Observable.ajax('/rooms.json');
  // const source = Observable.interval(ROOMS_POLL_INTERVAL)
    // .flatMap(() => observable);

  return observable.map(e => e.response);
}
