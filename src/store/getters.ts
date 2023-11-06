const getters = {
  token: (state: any) => state.user.token,
  userInfo: (state: any) => state.user.userInfo,
  sidebar: (state: any) => state.app.sidebar,
};
export default getters;
