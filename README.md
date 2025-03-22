# Booze & Bites - Tienda online con Vue 3

Bienvenido al proyecto **Booze & Bites**, una tienda online desarrollada con **Vue 3** que implementa conceptos clave de reactividad utilizando `reactive()` y `watch()` para manejar dinámicamente productos, stock y estado de disponibilidad.

## Objetivo del proyecto

Este proyecto tiene como propósito **comprender cómo funciona la reactividad en Vue** al manejar listas de objetos y detectar cambios en propiedades anidadas, cumpliendo con las siguientes condiciones:

- **No se utiliza `computed`**, solo `reactive()` y `watch()`.
- La disponibilidad de un producto (`available`) se actualiza automáticamente cuando cambia su `stock`.

## Tecnologías usadas

- Vue 3 (Composition API)
- TailwindCSS para estilos
- FakeStoreAPI para datos simulados

## Estructura del proyecto

- `App.vue`: Componente principal que maneja el estado global reactivo y lógica principal.
- `components/Header.vue`: Encabezado con el icono de carro de compras.
- `components/ProductList.vue`: Muestra la lista de productos filtrados.
- `components/ProductCard.vue`: Tarjeta visual de cada producto.
- `components/ShoppingCart.vue`: Carrito lateral de compras.

## Funcionalidades

- Cargar productos desde una API externa.
- Añadir productos al carrito.
- Control dinámico de stock.
- Mostrar estado de disponibilidad (disponible / agotado).
- Guardar y restaurar carrito desde `localStorage`.
- Transiciones animadas.

## Lógica de reactividad

Se usa `reactive()` para manejar el estado y `watch()` para observar cambios en propiedades anidadas como `stock` de cada producto. El sistema se asegura de actualizar automáticamente `available` en base al stock disponible.

```js
// Watch automático por producto
watch(
  () => producto.stock,
  (nuevoStock) => {
    producto.available = nuevoStock > 0;
  }
);
```

## Documentación: Reactividad en Vue

### 1. ¿Cómo podrías observar un cambio en una propiedad anidada?
Usando `watch(() => producto.stock, callback)` para reaccionar a cambios en propiedades dentro de objetos.

### 2. ¿Cómo funciona watch() con propiedades específicas dentro de reactive()?
`watch()` evalúa una función que retorna la propiedad deseada, registra sus dependencias, y reacciona si cambian.

### 3. ¿Cómo harías que un watch() detecte cambios en stock dentro de un array de productos?
Recorriendo el array y agregando un `watch()` individual a cada `producto.stock`:

```js
state.productos.forEach(producto => {
  watch(() => producto.stock, nuevo => {
    producto.available = nuevo > 0;
  });
});
```

© 2025 Booze & Bites - Grupo NextStride