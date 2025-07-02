<template>
  <v-container>
    <h1 class="mb-4">Dashboard</h1>
    <p>Bem-vindo ao painel administrativo! Aqui você pode ver informações rápidas.</p>

    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-4">
          <v-card-title>Previsão do Tempo (Joinville, SC)</v-card-title>
          <v-card-text v-if="weatherData">
            <p><strong>Local:</strong> {{ weatherData.name }}, {{ weatherData.sys.country }}</p>
            <p><strong>Temperatura:</strong> {{ weatherData.main.temp }}°C</p>
            <p><strong>Sensação Térmica:</strong> {{ weatherData.main.feels_like }}°C</p>
            <p><strong>Condição:</strong> {{ weatherData.weather[0].description }}</p>
            <img v-if="weatherData.weather[0].icon"
                 :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
                 alt="Ícone do tempo"
                 style="vertical-align: middle; margin-right: 8px;">
            <p><strong>Umidade:</strong> {{ weatherData.main.humidity }}%</p>
            <p><strong>Vento:</strong> {{ weatherData.wind.speed }} m/s</p>
          </v-card-text>
          <v-card-text v-else-if="weatherError">
            <v-alert type="error" dense text>
              {{ weatherError }}
            </v-alert>
          </v-card-text>
          <v-card-text v-else>
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            Carregando previsão do tempo...
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-4">
          <v-card-title>Total de Produtos</v-card-title>
          <v-card-text>
            <p class="display-1">{{ allProducts.length }}</p>
            <v-btn text color="primary" to="/products">Ver produtos</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DashboardPage',
  data() {
    return {
      weatherData: null,
      weatherError: null,
      allProducts: [],
    };
  },
  mounted() {
    // Lógica de carregamento da previsão do tempo e produtos
  }
};
</script>

<style scoped>
</style>
