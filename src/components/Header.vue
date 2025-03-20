<script setup>
const props = defineProps({
  cartCount: { type: Number, required: true }
});
</script>

<template>
  <header class="navbar fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-md z-50">
    <div class="container mx-auto flex justify-between items-center py-4 px-6">
      <h1 class="text-2xl font-bold text-white">Booze & Bites</h1>
      <div class="relative flex items-center cursor-pointer" @click="$emit('toggle-cart')">
        <svg class="w-8 h-8 text-white hover:text-gray-100 transition" viewBox="0 0 576 512">
          <path fill="currentColor"
            d="M528.12 301.319l47.273-208C578.597 70.837 566.9 64 551.67 64H126.659l-9.405-44.715C114.525 10.216 101.235 0 86.266 0H12C5.373 0 0 5.373 0 12v12.007C0 30.643 5.373 36 12 36h58.664l70.016 334.96c5.122 24.537 27.324 41.04 52.073 41.04h292.68c26.296 0 48.39-19.592 52.073-45.272l30.678-135.454c3.414-15.071-4.42-30.319-19.19-33.77z" />
        </svg>
        <span v-if="cartCount > 0"
          class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
          {{ cartCount }}
        </span>
      </div>
    </div>
  </header>
</template>