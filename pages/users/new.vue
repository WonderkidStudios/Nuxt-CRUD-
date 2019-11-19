<template>
  <v-layout column>
    <h3 class="mb-2">New User</h3>
    <user-form :user="user" :submit="submit" />
  </v-layout>
</template>

<script>
import UserForm from "~/components/users/form";

export default {
  middleware: 'authenticated',
  components: {
    UserForm
  },
  data: () => ({
    user: {}
  }),
  methods: {
    async submit() {
      await this.$store.dispatch("users/add", this.user);
      this.$router.push("/users");
    }
  }
};
</script>
