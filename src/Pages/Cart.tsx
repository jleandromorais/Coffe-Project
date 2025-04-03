import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from '../styles/Cart.module.css';
import { useShoppingCart } from '../hooks/useCart'; // Ajuste o caminho



const ShoppingCart: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    calculateTotal,
    clearCart
  } = useShoppingCart();

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

          <div className={styles.cartSummary}>
    <h3>Total: R$ {calculateTotal().toFixed(2)}</h3>
    <div className={styles.btnGroup}>
        <button className={styles.btnClear}>Limpar Carrinho</button>
        <button className={styles.checkoutButton}>Finalizar Compra</button>
    </div>
</div>

        </>
      ) : (
        <p className={styles.emptyCartMessage}>Seu carrinho está vazio</p>
      )}
    </div>
  );
};

export default ShoppingCart;
