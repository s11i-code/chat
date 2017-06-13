import _ from 'lodash';

export function generateUsername() {
  return `Anonymous${_.random(1, 10000)}`;
}
