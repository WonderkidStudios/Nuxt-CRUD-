<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn color="error" dark v-on="on">Delete</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">A You Sure?</v-card-title>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" @click="dialog = false">No</v-btn>
        <v-btn color="red darken-1" @click="_del">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["del"],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    _del() {
      this.del();
      this.dialog = false;
    }
  }
};
</script>