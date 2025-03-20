<script setup>
import { reactive, onMounted, watch } from 'vue';
import Header from './components/Header.vue';
import ProductList from './components/ProductList.vue';
import ShoppingCart from './components/ShoppingCart.vue';

const state = reactive({
  listProducts: [],
  filterOption: "Todos",
  cart: [],
  cartOpen: false,
  showPopup: false,
  filteredProducts: [],
  totalCartPrice: "0.00"
});

// Cargar productos desde la API al montar el componente
onMounted(() => {
  fetch('https://fakestoreapi.com/products')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      state.listProducts = data.map(product => {
        const stock = product.rating ? product.rating.count : 0;
        return {
          id: product.id,
          name: product.title,
          price: product.price,
          initialStock: stock,         // Stock original
          stock: stock,                // Stock actual
          available: stock > 0,        // Disponible si hay stock
          img: product.image
        };
      });
    })
    .catch(error => console.error('Error:', error));

  // Cargar carrito desde localStorage, si existe
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    try {
      state.cart = JSON.parse(storedCart);
    } catch (error) {
      console.error("Error al parsear el carrito:", error);
    }
  }
});

// Watch para actualizar filteredProducts cuando cambie filterOption o listProducts
watch(
  [() => state.filterOption, () => state.listProducts],
  ([newFilter, newProducts]) => {
    if (newFilter === "Todos") {
      state.filteredProducts = newProducts;
    } else {
      state.filteredProducts = newProducts.filter(product =>
        newFilter === "Disponibles" ? product.available : !product.available
      );
    }
  },
  { deep: true, immediate: true }
);

// Watch para calcular totalCartPrice cuando cambie el carrito
watch(
  () => state.cart,
  (newCart) => {
    let total = 0;
    newCart.forEach(item => {
      total += item.price * item.quantity;
    });
    state.totalCartPrice = total.toFixed(2);
  },
  { deep: true, immediate: true }
);

// Función para actualizar la disponibilidad de un producto
const updateAvailability = (product) => {
  product.available = product.stock > 0;
};

const addToCart = (productId) => {
  console.log("Producto a agregar:", productId);
  const product = state.listProducts.find(p => p.id === productId);
  if (!product) return;
  
  let existingItem = state.cart.find(item => item.id === product.id);
  const currentQuantity = existingItem ? existingItem.quantity : 0;
  const newQuantity = currentQuantity + 1;
  
  // Si se excede el stock, no se agrega nada
  if (newQuantity > product.initialStock) {
    console.log("No hay suficiente stock");
    return;
  }
  
  if (existingItem) {
    existingItem.quantity = newQuantity;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }
  
  product.stock = product.initialStock - newQuantity;
  updateAvailability(product);
  
  localStorage.setItem("shopping-cart", JSON.stringify(state.cart));
};

const increaseQuantity = (cartItem) => {
  const product = state.listProducts.find(p => p.id === cartItem.id);
  if (!product) return;
  const newQuantity = cartItem.quantity + 1;
  if (newQuantity > product.initialStock) {
    console.log("No se puede aumentar, stock máximo alcanzado");
    return;
  }
  
  cartItem.quantity = newQuantity;
  product.stock = product.initialStock - newQuantity;
  updateAvailability(product);
  
  localStorage.setItem("shopping-cart", JSON.stringify(state.cart));
};

const decreaseQuantity = (cartItem) => {
  const product = state.listProducts.find(p => p.id === cartItem.id);
  if (cartItem.quantity > 1) {
    cartItem.quantity--;
    product.stock = product.initialStock - cartItem.quantity;
    updateAvailability(product);
  } else {
    removeFromCart(cartItem);
  }
  localStorage.setItem("shopping-cart", JSON.stringify(state.cart));
};

const removeFromCart = (cartItem) => {
  const product = state.listProducts.find(p => p.id === cartItem.id);
  if (product) {
    product.stock = product.initialStock;
    updateAvailability(product);
  }
  state.cart = state.cart.filter(item => item.id !== cartItem.id);
  localStorage.setItem("shopping-cart", JSON.stringify(state.cart));
};

const toggleCart = () => {
  state.cartOpen = !state.cartOpen;
};

const orderDelivery = () => {
  if (state.cart.length === 0) return;
  
  state.showPopup = true;
  state.cart = [];
  localStorage.setItem("shopping-cart", JSON.stringify(state.cart));
  setTimeout(() => {
    state.showPopup = false;
    state.cartOpen = false;
  }, 2000);
};
</script>

<template>
  <Header :cartCount="state.cart.length" @toggle-cart="toggleCart" />
  <ProductList :products="state.filteredProducts" @add-to-cart="addToCart" />
  <ShoppingCart 
    :cart="state.cart" 
    :totalCartPrice="state.totalCartPrice" 
    :cartOpen="state.cartOpen" 
    @toggle-cart="toggleCart"
    @increase="increaseQuantity"
    @decrease="decreaseQuantity"
    @remove="removeFromCart"
    @order-delivery="orderDelivery"
  />
  
  <!-- Popup de Compra Realizada -->
  <transition name="fade">
    <div v-if="state.showPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h3 class="text-xl font-semibold text-blue-400">¡Compra Exitosa! 🎉</h3>
        <p class="mt-2 text-gray-300">Tu pedido ha sido registrado correctamente.</p>
        <button class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                @click="state.showPopup = false">
          Cerrar
        </button>
      </div>
    </div>
  </transition>
  
  <footer class="bg-gray-900 text-gray-300 py-6 mt-8 shadow-lg">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
      <p class="text-sm">&copy; 2025 Booze & Bites - Todos los derechos reservados.</p>
      <div class="flex space-x-4 mt-4 md:mt-0">
        <a href="#" class="hover:text-blue-400 transition">Términos</a>
        <a href="#" class="hover:text-blue-400 transition">Privacidad</a>
        <a href="#" class="hover:text-blue-400 transition">Contacto</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.navbar {
  transition: background-color 0.3s ease-in-out;
}
.navbar:hover {
  background-color: #1e293b;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>