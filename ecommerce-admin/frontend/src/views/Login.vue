<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>
            Login
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="E-mail"
                prepend-icon="mdi-email"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Senha"
                prepend-icon="mdi-lock"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary" block :loading="loading">
                Entrar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage', // Alterado para nome composto
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      // Lógica de login aqui
      this.loading = false;
    }
  }
};
</script>

<style scoped>
</style>
