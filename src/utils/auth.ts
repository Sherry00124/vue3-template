const TokenKey = "token";

export function getToken() {
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token: any) {
  return sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}

const UserInfo = "userInfo";

export function getUserInfo(): string | null {
  const userInfo = sessionStorage.getItem(UserInfo);
  return userInfo ?? null; // 使用空值合并操作符，确保返回值不为 null
}

export function setUserInfo(userInfo: any) {
  return sessionStorage.setItem(UserInfo, JSON.stringify(userInfo));
}

export function removeUserInfo() {
  return sessionStorage.removeItem(UserInfo);
}
