<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="green" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field label="Login" name="login" prepend-icon type="text" />
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="green" @click="postLogin">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  layout: "null",
  middleware: "notAuthenticated",
  methods: {
    postLogin() {
      setTimeout(() => {
        // we simulate the async request with timeout.
        const auth = {
          accessToken: "someStringGotFromApiServiceWithAjax"
        };
        this.$store.dispatch("login", auth);
        this.$router.push("/");
      }, 1000);
    }
  }
};
</script>