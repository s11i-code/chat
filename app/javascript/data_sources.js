import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';

export function getMessagesSource(roomId) {

  const messages = Observable.ajax(`http://localhost:3000/rooms/${roomId}/messages.json`);
  return messages.map(e => e.response);
}
