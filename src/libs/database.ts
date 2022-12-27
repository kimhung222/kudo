import { ref, set } from 'firebase/database';
import { realtimeDB } from "./firebase";

export function writeUserData(userId: string, assign?: number[]) {
  set(ref(realtimeDB, 'users/' + userId), {
    userId,
    assign,
  })
}

export function updateGame(value: number) {
  set(ref(realtimeDB, 'currentGame'), value);
}
