export function getChatRoomUrl(roomId, username) {
  return `/rooms/${roomId}?username=${username}`;
}

export function getMessagesUrl(roomId) {
  return `/rooms/${roomId}/messages.json`;
}
