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
onMounted(() => {
    fetch('https://fakestoreapi.com/products')
        .then(response => {
        if (!response.ok)
            throw new Error('Error de red');
        return response.json();
    })
        .then(data => {
        const productosConWatch = data.map(product => {
            const stock = product.rating ? product.rating.count : 0;
            const prod = {
                id: product.id,
                name: product.title,
                price: product.price,
                initialStock: stock,
                stock: stock,
                available: stock > 0,
                img: product.image
            };
            watch(() => prod.stock, (nuevoStock) => {
                prod.available = nuevoStock > 0;
            });
            return prod;
        });
        state.listProducts = productosConWatch;
    });
    const storedCart = localStorage.getItem("booze-bites");
    if (storedCart) {
        try {
            state.cart = JSON.parse(storedCart);
        }
        catch (error) {
            console.error("Error al parsear el carrito:", error);
        }
    }
});
// Watch para calcular totalCartPrice cuando cambie el carrito
watch(() => state.cart, (newCart) => {
    let total = 0;
    newCart.forEach(item => {
        total += item.price * item.quantity;
    });
    state.totalCartPrice = total.toFixed(2);
}, { deep: true, immediate: true });
const addToCart = (productId) => {
    const product = state.listProducts.find(p => p.id === productId);
    if (!product)
        return;
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
    }
    else {
        state.cart.push({ ...product, quantity: 1 });
    }
    product.stock--;
    localStorage.setItem("booze-bites", JSON.stringify(state.cart));
};
const increaseQuantity = (cartItem) => {
    const product = state.listProducts.find(p => p.id === cartItem.id);
    if (!product)
        return;
    const newQuantity = cartItem.quantity + 1;
    if (newQuantity > product.initialStock) {
        console.log("No se puede aumentar, stock máximo alcanzado");
        return;
    }
    cartItem.quantity = newQuantity;
    product.stock--;
    localStorage.setItem("booze-bites", JSON.stringify(state.cart));
};
const decreaseQuantity = (cartItem) => {
    const product = state.listProducts.find(p => p.id === cartItem.id);
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
        product.stock++;
    }
    else {
        removeFromCart(cartItem);
    }
    localStorage.setItem("booze-bites", JSON.stringify(state.cart));
};
const removeFromCart = (cartItem) => {
    const product = state.listProducts.find(p => p.id === cartItem.id);
    if (product) {
        product.stock = product.initialStock;
    }
    state.cart = state.cart.filter(item => item.id !== cartItem.id);
    localStorage.setItem("booze-bites", JSON.stringify(state.cart));
};
const toggleCart = () => {
    state.cartOpen = !state.cartOpen;
};
const orderDelivery = () => {
    if (state.cart.length === 0)
        return;
    state.showPopup = true;
    state.cart = [];
    localStorage.setItem("booze-bites", JSON.stringify(state.cart));
    setTimeout(() => {
        state.showPopup = false;
        state.cartOpen = false;
    }, 2000);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
// CSS variable injection 
// CSS variable injection end 
/** @type {[typeof Header, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Header, new Header({
    ...{ 'onToggleCart': {} },
    cartCount: (__VLS_ctx.state.cart.length),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onToggleCart': {} },
    cartCount: (__VLS_ctx.state.cart.length),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onToggleCart: (__VLS_ctx.toggleCart)
};
var __VLS_2;
/** @type {[typeof ProductList, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(ProductList, new ProductList({
    ...{ 'onAddToCart': {} },
    products: (__VLS_ctx.state.listProducts),
}));
const __VLS_8 = __VLS_7({
    ...{ 'onAddToCart': {} },
    products: (__VLS_ctx.state.listProducts),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_10;
let __VLS_11;
let __VLS_12;
const __VLS_13 = {
    onAddToCart: (__VLS_ctx.addToCart)
};
var __VLS_9;
/** @type {[typeof ShoppingCart, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(ShoppingCart, new ShoppingCart({
    ...{ 'onToggleCart': {} },
    ...{ 'onIncrease': {} },
    ...{ 'onDecrease': {} },
    ...{ 'onRemove': {} },
    ...{ 'onOrderDelivery': {} },
    cart: (__VLS_ctx.state.cart),
    totalCartPrice: (__VLS_ctx.state.totalCartPrice),
    cartOpen: (__VLS_ctx.state.cartOpen),
}));
const __VLS_15 = __VLS_14({
    ...{ 'onToggleCart': {} },
    ...{ 'onIncrease': {} },
    ...{ 'onDecrease': {} },
    ...{ 'onRemove': {} },
    ...{ 'onOrderDelivery': {} },
    cart: (__VLS_ctx.state.cart),
    totalCartPrice: (__VLS_ctx.state.totalCartPrice),
    cartOpen: (__VLS_ctx.state.cartOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_17;
let __VLS_18;
let __VLS_19;
const __VLS_20 = {
    onToggleCart: (__VLS_ctx.toggleCart)
};
const __VLS_21 = {
    onIncrease: (__VLS_ctx.increaseQuantity)
};
const __VLS_22 = {
    onDecrease: (__VLS_ctx.decreaseQuantity)
};
const __VLS_23 = {
    onRemove: (__VLS_ctx.removeFromCart)
};
const __VLS_24 = {
    onOrderDelivery: (__VLS_ctx.orderDelivery)
};
var __VLS_16;
const __VLS_25 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    name: "fade",
}));
const __VLS_27 = __VLS_26({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
if (__VLS_ctx.state.showPopup) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "text-xl font-semibold text-blue-400" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mt-2 text-gray-300" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.state.showPopup))
                    return;
                __VLS_ctx.state.showPopup = false;
            } },
        ...{ class: "mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition" },
    });
}
var __VLS_28;
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({
    ...{ class: "bg-gray-900 text-gray-300 py-6 mt-8 shadow-lg" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container mx-auto flex flex-col md:flex-row justify-between items-center px-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex space-x-4 mt-4 md:mt-0" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
    ...{ class: "hover:text-blue-400 transition" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
    ...{ class: "hover:text-blue-400 transition" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
    ...{ class: "hover:text-blue-400 transition" },
});
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['w-80']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:mt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-blue-400']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-blue-400']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-blue-400']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Header: Header,
            ProductList: ProductList,
            ShoppingCart: ShoppingCart,
            state: state,
            addToCart: addToCart,
            increaseQuantity: increaseQuantity,
            decreaseQuantity: decreaseQuantity,
            removeFromCart: removeFromCart,
            toggleCart: toggleCart,
            orderDelivery: orderDelivery,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
