import { ref, set, get, child, update } from "firebase/database";
import { realtimeDB } from "./firebase";

export function writeUserData(userId: string, assign?: number[]) {
  set(ref(realtimeDB, "users/" + userId), {
    userId,
    assign,
  });
}

export const getUserKudoData = (userId: string) =>
  get(child(ref(realtimeDB), `users/${userId}/kudos`));

export const writeUserKudoData = (userId: string, data: any[]) =>
  update(ref(realtimeDB), {
    [`users/${userId}/kudos`]: data,
  });

export function updateGame(value: number) {
  set(ref(realtimeDB, "currentGame"), value);
}
