import { GraphQLClient, gql } from 'graphql-request';
const endpoint: string = 'http://localhost:5000';

console.log('Conectando a GraphQL endpoint:', endpoint);

export const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tipos
export interface Product {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  disponible: boolean;
  img: string;
}

export interface ModifiedProduct {
  id: number;
  stock: number;
  disponible: boolean;
}

// Queries & Mutations
const GET_PRODUCTS = gql`
  query GetProductos {
    productos {
      id
      nombre
      precio
      stock
      disponible
      img
    }
  }
`;

const MODIFY_STOCK = gql`
  mutation ModificarStock($id: Int!, $cantidad: Int!) {
    modificarStock(id: $id, cantidad: $cantidad) {
      producto {
        id
        stock
        disponible
      }
    }
  }
`;


// Funciones API
export async function fetchProducts(): Promise<Product[]> {
  console.log('Ejecutando consulta: GET_PRODUCTS');
  try {
    const data = await client.request<{ productos: Product[] }>(GET_PRODUCTS);
    console.log('Productos recibidos:', data);
    return data.productos;
  } catch (error) {
    console.error('Error en GET_PRODUCTS:', error);
    throw error;
  }
}
const COMPRAR_PRODUCTOS = gql`
  mutation ComprarProductos($productos: [ProductoCompraInput!]!) {
    comprarProductos(productos: $productos) {
      productosActualizados {
        id
        stock
        disponible
      }
    }
  }
`;

export async function comprarProductos(
  productos: { id: number; cantidad: number }[]
): Promise<ModifiedProduct[]> {
  try {
    const data = await client.request<{
      comprarProductos: { productosActualizados: ModifiedProduct[] };
    }>(COMPRAR_PRODUCTOS, { productos });

    return data.comprarProductos.productosActualizados;
  } catch (err) {
    console.error('Error en COMPRAR_PRODUCTOS:', err);
    throw err;
  }
}

export async function modifyStock(id: number, cantidad: number): Promise<ModifiedProduct> {
  console.log(`Modificando stock del producto ${id} con cantidad ${cantidad}`);
  try {
    const data = await client.request<{ modificarStock: { producto: ModifiedProduct } }>(
      MODIFY_STOCK,
      { id, cantidad }
    );
    console.log('Stock actualizado:', data);
    return data.modificarStock.producto;
  } catch (error) {
    console.error('Error en MODIFY_STOCK:', error);
    throw error;
  }
}