export function getRoomUrl(roomId) {
  return `/rooms/${roomId}`;
}

export function getRoomsUrl() {
  return '/rooms';
}

export function getMessagesUrl(roomId) {
  return `/rooms/${roomId}/messages.json`;
}
