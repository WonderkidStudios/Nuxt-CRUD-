<template>
  <v-layout column>
    <h3 class="mb-2">
      Users List
      <nuxt-link class="float-right" to="/users/new">
        <v-btn color="green darken-1">Add</v-btn>
      </nuxt-link>
    </h3>
    <v-data-table
      :headers="headers"
      :footer-props="{
            'items-per-page-options': [10, 20, 50, {text: 'All', value: -1}]
        }"
      :items="users"
      class="elevation-1"
      @click:row="openUser"
    ></v-data-table>
  </v-layout>
</template>

<script>
export default {
  middleware: "authenticated",
  data: () => ({
    headers: [
      { text: "#", value: "id" },
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" }
    ]
  }),
  async fetch({ store, params }) {
    if (store.state.users.list.length === 0) {
      await store.dispatch("users/fetch");
    }
  },
  computed: {
    users() {
      return this.$store.state.users.list;
    }
  },
  methods: {
    openUser(user) {
      this.$router.push("/users/" + user.id);
    }
  }
};
</script>
