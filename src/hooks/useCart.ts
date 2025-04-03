// useShoppingCart.ts
import { useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}
interface CartMeta{
  totalItems:number;
  totalPrice:number;
  createdAt:string;
  updatedAt:String;
}


export const useShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const[cartMeta,setCartMeta]=useState<CartMeta>(()=>({
    totalItems:0,
    totalPrice:0,
    createdAt:new Date().toISOString(),
    updatedAt: new Date().toISOString()

  }
  ));

  useEffect(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    const updatedMeta = {
      totalItems,
      totalPrice,
      createdAt: cartMeta.createdAt,
      updatedAt: new Date().toISOString()
    };

    setCartMeta(updatedMeta);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartMeta', JSON.stringify(updatedMeta));
  }, [cartItems]);


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

  const prepareCartForSubmission=()=>{
    return{
      cart:{
        items:cartItems.map(item=>({
          productId:item.id,
          name:item.name,
          unitPrice:item.price,
          quantity:item.quantity,
          image:item.image
        })),
        meta:cartMeta
      }
    }
  }
  const submitCart=async()=>{
    const cartData=prepareCartForSubmission();
  
  try{
    const response =await fetch('https://sua-api.com/cart',{
      method:'POST',
      headers:{
      },
      body: JSON.stringify(cartData)
    }
    );
    if (!response.ok) {
      throw new Error('Erro ao enviar carrinho');
  }
  return await response.json();
} catch (error) {
  console.error("Erro:", error);
  throw error;
}
}

  const clearCart = (): void => {
    setCartItems([]);
  };

  
  return {
    cartItems,
    cartMeta,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    prepareCartForSubmission,
    submitCart,
    totalItems: cartMeta.totalItems, // Agora retorna number (primitivo)
    totalPrice: cartMeta.totalPrice
  };
};