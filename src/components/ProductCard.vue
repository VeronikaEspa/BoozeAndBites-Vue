<script setup>
const props = defineProps({
  id: { type: Number, required: true },
  nombre: { type: String, required: true },
  precio: { type: [String, Number], required: true },
  disponible: { type: Boolean, required: true },
  stock: { type: String, required: false },
  img: { type: String, required: true }
});

const emit = defineEmits(["addToCart"]);

const handleAddToCart = () => {
  emit("addToCart", props.id);
};
</script>

<template>
  <div class="bg-gray-900 text-white rounded-xl shadow-lg w-60 p-4 transition-transform transform hover:scale-105">
    <div class="relative">
      <img :src="img" alt="Imagen del producto" class="w-full h-36 object-cover rounded-lg" />
      <span class="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-md flex items-center"
            :class="disponible ? 'bg-green-500 text-white' : 'bg-red-500 text-white'">
        <svg class="w-4 h-4 mr-1" viewBox="0 0 512 512" fill="currentColor">
          <path v-if="disponible" d="M173.898 439.404l-166.4-166.4c-15.598-15.598-15.598-40.949 0-56.547s40.949-15.598 56.547 0L192 312.305l299.955-299.955c15.598-15.598 40.949-15.598 56.547 0s15.598 40.949 0 56.547l-328.3 328.3c-15.6 15.598-40.95 15.598-56.304.207z"/>
          <path v-else d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.25c-12.28-12.28-32.19-12.28-44.48 0L9.25 111.49c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.25 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.19 12.28 44.48 0L176 322.72 276.07 422.8c12.28 12.28 32.19 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
        </svg>
        {{ disponible ? 'Disponible' : 'Agotado' }}
      </span>
    </div>

    <div class="mt-3 text-center">
      <h3 class="text-lg font-semibold text-blue-400 truncate">{{ nombre }}</h3>
      <p class="text-gray-300 text-sm mt-1 flex items-center justify-center">
        <svg class="w-4 h-4 mr-1 text-yellow-400" viewBox="0 0 576 512" fill="currentColor">
          <path d="M259.3 17.8L194 150.2l-146.1 21.3c-26.2 3.8-36.7 36-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7l130.7-68.7 130.6 68.7c23.3 12.3 51-7.5 46.4-33.7l-25-145.5 105.7-103c19-18.6 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.7-23.9-57.4 0z"/>
        </svg>
        ${{ precio }}
      </p>
      <!-- <p class="text-xs text-gray-400 mt-1">Stock: {{ stock }}</p> -->
    </div>

    <div class="mt-3 flex justify-center">
      <button 
        class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg flex items-center transition disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!disponible"
        @click="handleAddToCart">
        <svg class="w-5 h-5 mr-2" viewBox="0 0 448 512">
          <path fill="currentColor"
            d="M416 208H240V32c0-17.67-14.33-32-32-32s-32 14.33-32 32v176H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h144v176c0 17.67 14.33 32 32 32s32-14.33 32-32V272h176c17.67 0 32-14.33 32-32s-14.33-32-32-32z"/>
        </svg>
        Agregar
      </button>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  transition: background-color 0.3s ease-in-out;
}
.navbar:hover {
  background-color: #1e293b;
}
</style>