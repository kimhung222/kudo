import { child, get, getDatabase, ref, set, update } from 'firebase/database';
import { realtimeDB } from './firebase';
import { toast } from 'react-hot-toast';

export function writeUserData(userId: string, kudos?: any) {
  try {
    set(ref(realtimeDB, 'users/' + userId), {
      userId,
      kudos
    });
  } catch (error) {
    console.log({ error });
  }
}

export const getUserKudoData = (userId: string) => {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `users/${ userId }/kudos`));
};

export const writeUserKudoData = (userId: string, data: any[]) =>
  update(ref(realtimeDB), {
    [`users/${ userId }/kudos`]: data
  });

export function updateGame(value: number) {
  set(ref(realtimeDB, 'currentGame'), value);
}

export function writeMyMemories(userId = '', memories: any[]) {
  try {
    update(ref(realtimeDB), {
      [`users/${userId}/memories`]: memories
    });
  } catch (error) {
    toast.error('Oops, có lỗi xảy ra, chịu! 😝');
  }
}
