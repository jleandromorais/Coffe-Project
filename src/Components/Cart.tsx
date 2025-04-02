import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from './Cart.module.css';

// Definição do tipo para os itens do carrinho
interface CartItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Carregar itens iniciais no carrinho
  useEffect(() => {
    const initialItems: CartItem[] = [
      {
        id: 1,
        name: "Adidas T-Shirt",
        description: "Camiseta masculina Adidas",
        category: "Roupas",
        price: 391.00,
        quantity: 1,
        image: "https://via.placeholder.com/80"
      },
      {
        id: 2,
        name: "Adidas Socks",
        description: "Meias masculinas Adidas",
        category: "Acessórios",
        price: 77.00,
        quantity: 1,
        image: "https://via.placeholder.com/80"
      },
      {
        id: 3,
        name: "Adidas Shoes",
        description: "Tênis masculino Adidas",
        category: "Calçados",
        price: 604.00,
        quantity: 1,
        image: "https://via.placeholder.com/80"
      }
    ];
    setCartItems(initialItems);
  }, []);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className={styles.cartContainer}>
      <h2>Meu Carrinho</h2>
      
      {cartItems.length > 0 ? (
        <>
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className={styles.itemPrice}>R$ {item.price.toFixed(2)}</span>
                </div>
                <div className={styles.quantityControl}>
                  <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <span className={styles.totalItemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</span>
                <button className={styles.removeItem} onClick={() => removeItem(item.id)}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary    }>
            <h3>Total: R$ {calculateTotal().toFixed(2)}</h3>
            <button className={styles.checkoutButton}>Finalizar Compra</button>
          </div>
        </>
      ) : (
        <p className={styles.emptyCartMessage}>Seu carrinho está vazio</p>
      )}
    </div>
  );
};

export default ShoppingCart;
