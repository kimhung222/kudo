import { isNotEmpty } from '@techmely/utils';
import { child, get, getDatabase, ref, set, update } from 'firebase/database';
import { toast } from 'react-hot-toast';
import { realtimeDB } from './firebase';

export type IKudo = {
  content: string;
  userId: string;
};
export type IUser = {
  memories: string[];
  kudos: IKudo[];
};

export function writeUserData(userId: string, kudos = []) {
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
  return get(child(dbRef, `users/${userId}/kudos`));
};

export const writeUserKudoData = (userId: string, data: any[]) =>
  update(ref(realtimeDB), {
    [`users/${userId}/kudos`]: data
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

export async function getTechiesMemories() {
  try {
    const dbRef = ref(getDatabase());
    const users = await get(child(dbRef, 'users'));
    const memories = Object.values(users.exportVal())
      // @ts-expect-error Ignore type check dm
      .map(v => v?.memories || [])
      .filter(isNotEmpty) as string[];
    return memories;
  } catch (error) {
    toast.error('Oops, có lỗi xảy ra, chịu! 😝');
    return [];
  }
}
