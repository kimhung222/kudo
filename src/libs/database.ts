import { child, get, getDatabase, ref, set, update } from 'firebase/database';
import { toast } from 'react-hot-toast';
import { realtimeDB } from './firebase';

export type IKudo = {
  content: string;
  userId: string;
};

export type Memories = { [key: string]: string[] };

export type IUser = {
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

export function writeAllUsers(users) {
  return set(ref(realtimeDB, 'users/'), users);
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
      [`memories/${userId}`]: memories
    });
  } catch (error) {
    toast.error('Oops, có lỗi xảy ra, chịu! 😝');
  }
}

export function writeVoteMemories(userId = '', participantId?: any) {
  try {
    update(ref(realtimeDB), {
      [`votes/${userId}`]: participantId
    });
  } catch (error) {
    toast.error('Oops, có lỗi xảy ra, chịu! 😝');
  }
}

export async function getTechiesMemories() {
  try {
    const dbRef = ref(getDatabase());
    const memoriesDb = await get(child(dbRef, 'memories'));
    const memories = memoriesDb.exportVal() as Memories;
    return memories;
  } catch (error) {
    console.log('getTechiesMemories  👻  error', { error });
    toast.error('Oops, có lỗi xảy ra, chịu! 😝');
    return {};
  }
}

export function writeDistributeStatus(value) {
  try {
    set(ref(realtimeDB, 'distributeStatus/'), value);
  } catch (error) {
    console.log({ error });
  }
}
