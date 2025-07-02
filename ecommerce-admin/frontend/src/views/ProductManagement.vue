<template>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" md="4">
        <v-card class="pa-4">
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-subtitle>{{ product.price | currency }}</v-card-subtitle>
          <v-card-text>
            <v-btn text color="primary" :to="`/products/${product.id}`">Ver Detalhes</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProductManagementPage',
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    // Lógica de carregamento de produtos
  }
};
</script>

<style scoped>
</style>
