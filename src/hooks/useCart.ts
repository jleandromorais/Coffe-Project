import { useState } from 'react';
import { CartItem } from './CartItem'; // Ajuste o caminho conforme necessário

export const useShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const updateQuantity = (itemId: number, newQuantity: number): void => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: number): void => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const addToCart = (product: Omit<CartItem, 'quantity'>): void => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    calculateTotal,
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: calculateTotal()
  };
};