<script setup lang="ts">
import ProductCard from './ProductCard.vue'

interface Product {
  id: number
  nombre: string
  precio: number
  img: string
  stock: number
  disponible: boolean
}

const props = defineProps<{ products: Product[] }>()

const emit = defineEmits<{
  (e: 'add-to-cart', productId: number): void
}>()
</script>

<template>
  <div
    class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    v-if="props.products.length"
  >
    <ProductCard
      v-for="p in props.products"
      :key="p.id"
      :id="p.id"
      :nombre="p.nombre"
      :precio="p.precio"
      :img="p.img"
      :stock="p.stock"
      :disponible="p.disponible"
      @add-to-cart="emit('add-to-cart', $event)"
    />
  </div>

  <p v-else class="text-center text-gray-500 py-8">Cargando productos…</p>
</template>