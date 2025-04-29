import { ActiveUser } from "./active-user";

export type UserState =
  | { isLoggedIn: true; user: ActiveUser }
  | { isLoggedIn: false };
