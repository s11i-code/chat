// this the app's secondary storage.  it acts only as an accessory to state.
// this is how e.g username persists between static page loads (if browser is not in incognito mode)

/* global localStorage */
function getFromStorage(name) {
  try {
    return localStorage.getItem(name);
  } catch (error) {
    return null;
  }
}

function putToStorage(name, value) {
  try {
    localStorage.setItem(name, value);
  } catch (error) {
  }
}

export function storeUsername(value) {
  return putToStorage('username', value);
}

export function getUsername() {
  return getFromStorage('username');
}

export function storeLastVisitedRoomId(value) {
  return putToStorage('lastVisitedChatId', value);
}

export function getLastVisitedRoomId() {
  return getFromStorage('lastVisitedChatId');
}
