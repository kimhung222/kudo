import { ref, set, get, child, update, getDatabase } from 'firebase/database';
import { realtimeDB } from './firebase';

export function writeUserData(userId: string, assign?: number[]) {
  try {
    set(ref(realtimeDB, 'users/' + userId), {
      userId,
      assign
    });
  } catch (error) {
    console.log({ error });
  }
}

export const getUserKudoData = (userId: string) => {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `users/${userId}/kudos`));
};

export const writeUserKudoData = (userId: string, data: any[]) =>
  update(ref(realtimeDB), {
    [`users/${userId}/kudos`]: data
  });

export function updateGame(value: number) {
  set(ref(realtimeDB, 'currentGame'), value);
}

export function writeMyMemories(userId: string, memories) {
  update(ref(realtimeDB, `users/${userId}/memories`), memories);
}
