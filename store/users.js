export const state = () => ({
    list: []
})

export const mutations = {
    setUsers(state, users) {
        state.list = users
    },
    // get(state, user) {
    //     return state.list.find(u => u.id === u.id)
    // },
    add(state, user) {
        state.list.push(user)
    },
    update(state, user) {
        state.list.some((u, i) => u.id === user.id && (state.list[i] = user))
        // state.list.map(u => u.id === user.id && (u.name = user.name))
        //state.list.forEach((u, i) => u.id === user.id && (state.list[i] = user))
    },
    delete(state, user) {
        state.list = state.list.filter(u => u.id !== u.id)
    },
}

export const actions = {
    async fetch({ commit }) {
        const { data } = await this.$axios.post('/api/users')
        commit('setUsers', data)
    },
    // async get({ commit }, id) {
    //     
    // },
    async add({ commit }, user) {
        const { data } = await this.$axios.put("/api/user", user)
        commit('add', data)
    },
    async update({ commit }, user) {
        const { data } = await this.$axios.post("/api/user", user)
        commit('update', data)
    },
    async delete({ commit }, user) {
        const { data } = await this.$axios.delete(`/api/user/${user.id}`)
        commit('delete', user)
    }
}
