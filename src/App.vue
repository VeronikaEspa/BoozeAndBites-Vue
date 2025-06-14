<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue';
import Header from './components/Header.vue';
import ProductList from './components/ProductList.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import { fetchProducts, modifyStock, Product } from './api';

interface CartItem extends Product {
  quantity: number;
}

const state = reactive({
  listProducts: [] as Product[],
  filterOption: 'Todos',
  cart: [] as CartItem[],
  cartOpen: false,
  showPopup: false,
  filteredProducts: [] as Product[],
  totalCartPrice: '0.00',
});

onMounted(async () => {
  try {
    const productos = await fetchProducts();
    const productosConWatch = productos.map((product) => {
      const prod = {
        ...product,
        // initialStock: product.stock,
      };

      watch(
        () => prod.stock,
        (nuevoStock) => {
          prod.disponible = nuevoStock > 0;
        }
      );

      return prod;
    });

    state.listProducts = productosConWatch;
  } catch (err) {
    console.error('Error al obtener productos:', err);
  }

  const storedCart = localStorage.getItem('booze-bites');
  if (storedCart) {
    try {
      state.cart = JSON.parse(storedCart);
    } catch (error) {
      console.error('Error al parsear el carrito:', error);
    }
  }
});

watch(
  () => state.cart,
  (newCart) => {
    let total = 0;
    newCart.forEach((item) => {
      total += item.precio * item.quantity;
    });
    state.totalCartPrice = total.toFixed(2);
  },
  { deep: true, immediate: true }
);

const addToCart = (productId: number) => {
  const product = state.listProducts.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find((item) => item.id === product.id);
  const currentQuantity = existingItem?.quantity ?? 0;
  const newQuantity = currentQuantity + 1;

  if (newQuantity > product.stock) {
    console.log('No hay suficiente stock');
    return;
  }

  product.stock--;

  if (existingItem) {
    existingItem.quantity = newQuantity;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('booze-bites', JSON.stringify(state.cart));
};


const increaseQuantity = async (cartItem: CartItem) => {
  const product = state.listProducts.find((p) => p.id === cartItem.id);
  if (!product) return;

  const newQuantity = cartItem.quantity + 1;
  if (newQuantity > product.stock) {
    console.log('Stock insuficiente');
    return;
  }

  try {
    await modifyStock(product.id, -1);
    cartItem.quantity++;
    product.stock--;
    localStorage.setItem('booze-bites', JSON.stringify(state.cart));
  } catch (err) {
    console.error('Error al aumentar stock:', err);
  }
};

const decreaseQuantity = async (cartItem: CartItem) => {
  const product = state.listProducts.find((p) => p.id === cartItem.id);
  if (cartItem.quantity > 1) {
    try {
      await modifyStock(product!.id, 1);
      cartItem.quantity--;
      product!.stock++;
      localStorage.setItem('booze-bites', JSON.stringify(state.cart));
    } catch (err) {
      console.error('Error al disminuir stock:', err);
    }
  } else {
    removeFromCart(cartItem);
  }
};

const removeFromCart = async (cartItem: CartItem) => {
  const product = state.listProducts.find((p) => p.id === cartItem.id);
  if (product) {
    const quantityToReturn = cartItem.quantity;
    try {
      await modifyStock(product.id, quantityToReturn);
      product.stock += quantityToReturn;
      state.cart = state.cart.filter((item) => item.id !== cartItem.id);
      localStorage.setItem('booze-bites', JSON.stringify(state.cart));
    } catch (err) {
      console.error('Error al eliminar del carrito:', err);
    }
  }
};

const toggleCart = () => {
  state.cartOpen = !state.cartOpen;
};

import { comprarProductos } from './api';

const orderDelivery = async () => {
  if (state.cart.length === 0) return;

  try {
    const productosParaEnviar = state.cart.map(item => ({
      id: item.id,
      cantidad: item.quantity
    }));

    const actualizados = await comprarProductos(productosParaEnviar);

    actualizados.forEach((actualizado) => {
      const localProduct = state.listProducts.find(p => p.id === actualizado.id);
      if (localProduct) {
        localProduct.stock = actualizado.stock;
        localProduct.disponible = actualizado.disponible;
      }
    });

    state.showPopup = true;
    state.cart = [];
    localStorage.setItem('booze-bites', JSON.stringify(state.cart));

    setTimeout(() => {
      state.showPopup = false;
      state.cartOpen = false;
    }, 2000);
  } catch (err) {
    console.error('Error al realizar la orden:', err);
  }
};

</script>

<template>
  <Header :cartCount="state.cart.length" @toggle-cart="toggleCart"></Header>
  <ProductList :products="state.listProducts" @add-to-cart="addToCart" />
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

  <transition name="fade">
    <div
      v-if="state.showPopup"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h3 class="text-xl font-semibold text-blue-400">¡Compra Exitosa! 🎉</h3>
        <p class="mt-2 text-gray-300">Tu pedido ha sido registrado correctamente.</p>
        <button
          class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          @click="state.showPopup = false"
        >
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>