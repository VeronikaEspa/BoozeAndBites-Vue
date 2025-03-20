<script setup>
import ProductCard from './ProductCard.vue';
const props = defineProps({
  products: { type: Array, required: true }
});
</script>

<template>
  <main class="container mx-auto py-8 mt-12">
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :price="product.price"
        :available="product.stock > 0"
        :img="product.img"
        :stock="product.stock"
        @addToCart="$emit('add-to-cart', $event)"
      ></ProductCard>
    </section>
  </main>
</template>