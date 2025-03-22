import ProductCard from './ProductCard.vue';
const props = defineProps({
    products: { type: Array, required: true }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "container mx-auto py-8 mt-12" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center" },
});
for (const [product] of __VLS_getVForSourceType((__VLS_ctx.products))) {
    /** @type {[typeof ProductCard, typeof ProductCard, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ProductCard, new ProductCard({
        ...{ 'onAddToCart': {} },
        key: (product.id),
        id: (product.id),
        name: (product.name),
        price: (product.price),
        available: (product.stock > 0),
        img: (product.img),
        stock: (product.stock),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onAddToCart': {} },
        key: (product.id),
        id: (product.id),
        name: (product.name),
        price: (product.price),
        available: (product.stock > 0),
        img: (product.img),
        stock: (product.stock),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = {
        onAddToCart: (...[$event]) => {
            __VLS_ctx.$emit('add-to-cart', $event);
        }
    };
    var __VLS_2;
}
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-12']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-items-center']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            ProductCard: ProductCard,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
