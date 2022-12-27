import { ref, set } from 'firebase/database';
import { realtimeDB } from "./firebase";

export function writeUserData(userId: string) {
  set(ref(realtimeDB, 'users/' + userId), {
    userId
  })
}

export function updateGame(value: number) {
  set(ref(realtimeDB, 'currentGame'), value);
}
