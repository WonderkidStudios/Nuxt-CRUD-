<template>
  <v-layout column>
    <h3 class="mb-2">User Info #{{ user.id }}</h3>
    <h5>User name: {{ user.name }}</h5>
    <user-form :user="user" :submit="update" :del="del" />
  </v-layout>
</template>

<script>
import UserForm from "~/components/users/form";

export default {
  middleware: "authenticated",
  components: {
    UserForm
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  async asyncData({ $axios, params, store }) {
    let { data } = await $axios.get(`/api/user/${params.id}`);
    const user = data;
    return { user };

    // if (store.state.users.list.length === 0) {
    //   await store.dispatch("users/fetch")
    // }
    // const user = store.state.users.list.find(u => u.id === parseInt(params.id))
    // return { user }
  },

  methods: {
    async update() {
      await this.$store.dispatch("users/update", this.user);
      this.$router.push("/users");
    },
    async del() {
      await this.$store.dispatch("users/delete", this.user);
      this.$router.push("/users");
    }
  }
};
</script>
