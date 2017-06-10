export function getRoomUrl(roomId, username) {
  return `/rooms/${roomId}?username=${username}`;
}

export function getRoomsUrl() {
  return '/rooms';
}

export function getMessagesUrl(roomId) {
  return `/rooms/${roomId}/messages.json`;
}
