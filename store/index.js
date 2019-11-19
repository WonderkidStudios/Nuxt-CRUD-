const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require("js-cookie") : undefined;

export const state = () => {
  return {
    auth: null
  }
}
export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  }
}
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setAuth', auth)
  },
  login({ commit }, auth) {
    Cookie.set("auth", auth)
    commit("setAuth", auth)
  },
  logout({ commit }) {
    Cookie.remove("auth")
    commit("setAuth", null)
  },
}
