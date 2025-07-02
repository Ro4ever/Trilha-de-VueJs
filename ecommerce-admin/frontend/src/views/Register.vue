<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>
            Registro
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleRegister">
              <v-text-field
                v-model="username"
                label="Nome de Usuário"
                prepend-icon="mdi-account"
                type="text"
                required
              ></v-text-field>
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
                Registrar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RegisterPage', // Alterado para nome composto
  data() {
    return {
      username: '',
      email: '',
      password: '',
      loading: false,
    };
  },
  methods: {
    ...mapActions('auth', ['register']), // Mapeia a ação de registro

    async handleRegister() {
      this.loading = true;
      await this.register({
        username: this.username,
        email: this.email,
        password: this.password,
      });
      this.loading = false;
    }
  }
};
</script>

<style scoped>
</style>
