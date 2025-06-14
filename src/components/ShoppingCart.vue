<script setup>
const props = defineProps({
  cart: { type: Array, required: true },
  totalCartPrice: { type: String, required: true },
  cartOpen: { type: Boolean, required: true }
});
</script>

<template>
  <div class="fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out"
       :class="{ 'translate-x-0': cartOpen, 'translate-x-full': !cartOpen }">
    <div class="flex justify-between items-center bg-gray-800 text-white p-4">
      <h2 class="text-lg font-semibold">Carrito de Compras</h2>
      <button class="text-gray-400 hover:text-red-500 transition" @click="$emit('toggle-cart')">
        ✖
      </button>
    </div>
    <ul v-if="cart.length > 0" class="p-4 space-y-4 overflow-y-auto max-h-[65vh]">
      <li v-for="item in cart" :key="item.id" class="flex items-center bg-gray-800 p-3 rounded-lg shadow">
        <img :src="item.img" alt="Producto" class="w-14 h-14 object-cover rounded-lg">
        <div class="ml-4 flex-1">
          <h3 class="text-sm text-gray-300 font-medium">{{ item.nombre }}</h3>
          <p class="text-blue-400 font-bold">${{ item.price }}</p>
          <div class="flex items-center space-x-2 mt-1">
            <button class="bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600 transition"
                    @click="$emit('decrease', item)">
              −
            </button>
            <span class="text-white">{{ item.quantity }}</span>
            <button class="bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600 transition"
                    @click="$emit('increase', item)">
              +
            </button>
          </div>
        </div>
        <button class="text-red-500 hover:text-red-400 transition" @click="$emit('remove', item)">
          ✖
        </button>
      </li>
    </ul>
    <div v-else class="flex items-center justify-center h-64 text-gray-400">
      Tu carrito está vacío.
    </div>
    <div class="p-4 bg-gray-800 text-white">
      <div class="flex justify-between text-lg font-semibold">
        <span>Total:</span>
        <strong class="text-blue-400">${{ totalCartPrice }}</strong>
      </div>
      <button class="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              @click="$emit('order-delivery')"
              :disabled="cart.length === 0">
        Pedir Domicilio
      </button>
    </div>
  </div>
</template>