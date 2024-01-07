const USER_KEY = "user";
import { UserData } from "../types/types.d";

export function getUserData(): UserData | null {
  const localStorageUserData = localStorage.getItem(USER_KEY);
  const sessionStorageUserData = sessionStorage.getItem(USER_KEY);

  if (localStorageUserData) return JSON.parse(localStorageUserData) as UserData;
  if (sessionStorageUserData)
    return JSON.parse(sessionStorageUserData) as UserData;
  return null;
}

export function setUserData(isRemember: boolean, userData: UserData): void {
  if (isRemember) {
    return localStorage.setItem(USER_KEY, JSON.stringify(userData));
  }
  sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
}

export function resetUserData(): void {
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
}
