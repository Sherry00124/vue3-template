const getters = {
  token: (state: any) => state.user.token,
  userInfo: (state: any) => state.user.userInfo,
  sidebar: (state: any) => state.app.sidebar,
  lang: (state: any) => state.lang.currentLang,
};
export default getters;
