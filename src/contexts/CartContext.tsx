import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface CartItem {
    productoId: number;
    producto: string;
    precio: number;
    cantidad: number;
    imagen: string;
    IVA: number;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (producto: CartItem) => void;
  updateItem: (productoId: number, cantidad: number) => void;
  removeItem: (productoId: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.customerId) {
      loadCart(user.customerId);
    }
  }, [user]);

  // Cargar el carrito desde la API y localStorage
  const loadCart = async (customerId: number) => {
    setIsLoading(true);
    try {
      const storedCart = localStorage.getItem('cart');
      const localCart = storedCart ? JSON.parse(storedCart) : [];

      const { data } = await axios.get(`http://localhost:5000/cart/${customerId}`);
      const combinedCart = mergeCarts(localCart, data);

      setCart(combinedCart);
      localStorage.setItem('cart', JSON.stringify(combinedCart));
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const mergeCarts = (localCart: CartItem[], apiCart: CartItem[]) => {
    // Combina el carrito local con el de la API
    const combinedCart = [...localCart];
    apiCart.forEach(apiItem => {
      const index = combinedCart.findIndex(item => item.productoId === apiItem.productoId);
      if (index > -1) {
        combinedCart[index].cantidad = apiItem.cantidad; // Sobrescribir en vez de sumar
      } else {
        combinedCart.push(apiItem);
      }
    });
    return combinedCart;
  };

  const addItem = async (producto: CartItem) => {
    if (user?.customerId) {
        try {
            // Verifica si el producto ya está en el carrito
            const existingProductIndex = cart.findIndex(item => item.productoId === producto.productoId);

            let updatedCart;

            if (existingProductIndex > -1) {
                // Si el producto ya existe, suma las cantidades
                const existingProduct = cart[existingProductIndex];
                const newQuantity = existingProduct.cantidad + producto.cantidad;

                updatedCart = cart.map((item, index) =>
                    index === existingProductIndex
                        ? { ...item, cantidad: newQuantity }
                        : item
                );

                // Actualiza el producto en la API
                await updateItem(producto.productoId, newQuantity); // Llama a la función updateItem
            } else {
                // Si no existe, simplemente agrega el nuevo producto
                updatedCart = [...cart, producto];

                // Envía la nueva adición a la API
                const cartItemWithCustomer = {
                    customerId: user.customerId,
                    ...producto,
                };

                await axios.post('http://localhost:5000/cart/', cartItemWithCustomer);
            }

            // Actualiza el estado del carrito y el localStorage
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Error adding item:', error);
        }
    }
};




  const updateItem = async (productoId: number, cantidad: number) => {
    if (user?.customerId) {
      try {
        const updatedCart = cart.map(item => item.productoId === productoId ? { ...item, cantidad } : item);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        await axios.put(`http://localhost:5000/cart/${user.customerId}/${productoId}`, { cantidad });
      } catch (error) {
        console.error('Error updating item:', error);
      }
    }
  };

  const removeItem = async (productoId: number) => {
    if (user?.customerId) {
      try {
        const updatedCart = cart.filter(item => item.productoId !== productoId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        await axios.delete(`http://localhost:5000/cart/`, { data: { productoId, customerId: user.customerId } });
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }
  };

  const clearCart = async () => {
    if (user?.customerId) {
      try {
        setCart([]);
        localStorage.removeItem('cart');
        await axios.delete(`http://localhost:5000/cart/clear/${user.customerId}`);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItem, updateItem, removeItem, clearCart, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
