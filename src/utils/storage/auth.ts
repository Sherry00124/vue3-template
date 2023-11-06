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
interface userInfo {
  effectiveAmount: string;
  institution: string;
  merchantId: string;
  mobile: string;
  status: string;
  topUpAddress: string;
}
export function getUserInfo(): userInfo | null {
  return JSON.parse(sessionStorage.getItem(UserInfo) as string) as userInfo | null; // 使用空值合并操作符，确保返回值不为 null
}

export function setUserInfo(userInfo: any) {
  return sessionStorage.setItem(UserInfo, JSON.stringify(userInfo));
}

export function removeUserInfo() {
  return sessionStorage.removeItem(UserInfo);
}
