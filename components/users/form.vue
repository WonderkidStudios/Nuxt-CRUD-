<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="50"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-select
      v-model="role"
      :items="roles"
      :error-messages="selectErrors"
      label="Role"
      required
      @change="$v.role.$touch()"
      @blur="$v.role.$touch()"
    ></v-select>

    <v-btn class="mr-4" @click="_submit">submit</v-btn>
    <v-btn class="mr-4" @click="clear">clear</v-btn>
    <dialog-delete v-if="user.id" :del="del" />
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import DialogDelete from "~/components/users/dialog/delete";

export default {
  mixins: [validationMixin],

  components: {
    DialogDelete
  },

  props: ["user", "submit", "del"],

  validations: {
    name: { required, maxLength: maxLength(50) },
    email: { required, email },
    role: { required }
  },

  data: () => ({
    name: "",
    email: "",
    role: "",
    roles: ["Admin", "Editor", "User", "Subscriber"],
    dialog: false
  }),

  created() {
    this.name = this.user.name;
    this.email = this.user.email;
    this.role = this.user.role;
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 50 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.role.$dirty) return errors;
      !this.$v.role.required && errors.push("Item is required");
      return errors;
    }
  },

  methods: {
    _submit() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.user.name = this.name;
        this.user.email = this.email;
        this.user.role = this.role;
        this.submit();
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.role = null;
    }
  }
};
</script>