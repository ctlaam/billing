// store/auth.js
export const state = () => ({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  userId: null,
})

export const mutations = {
  setAuthentication(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },
  setTokens(state, { accessToken, refreshToken }) {
    state.accessToken = accessToken
    state.refreshToken = refreshToken
  },
  setUserId(state, userId) {
    state.userId = userId
  },
}

export const actions = {
  login({ commit }, { accessToken, refreshToken, userId }) {
    // Set authentication status and tokens
    commit('setAuthentication', true)
    commit('setTokens', { accessToken, refreshToken })
    commit('setUserId', userId)
  },
  logout({ commit }) {
    // Clear authentication status and tokens
    commit('setAuthentication', false)
    commit('setTokens', { accessToken: null, refreshToken: null })
    commit('setUserId', null)
  },
}
