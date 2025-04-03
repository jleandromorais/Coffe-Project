import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from '../styles/Cart.module.css';
import { useShoppingCart } from '../hooks/useCart';

const ShoppingCart: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    clearCart,
    submitCart,
    totalItems,
    totalPrice
    // Remova cartMeta da desestruturação pois não vamos mais usá-la
  } = useShoppingCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError('Seu carrinho está vazio!');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await submitCart();
      console.log('Pedido criado:', response);
      
      alert(`Pedido confirmado! Nº ${response.orderId}\nTotal: R$ ${totalPrice.toFixed(2)}`);
      clearCart();
      
    } catch (err) {
      console.error('Erro no checkout:', err);
      setError(err instanceof Error ? err.message : 'Erro ao processar pedido');
    } finally {
      setIsProcessing(false);
    }
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
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    disabled={isProcessing}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={isProcessing}
                  >
                    +
                  </button>
                </div>
                <span className={styles.totalItemPrice}>
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
                <button 
                  className={styles.removeItem} 
                  onClick={() => removeItem(item.id)}
                  disabled={isProcessing}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
            <p>Itens: {totalItems}</p>
            {/* Remova esta linha que mostra a data: 
            <p>Última atualização: {new Date(cartMeta.updatedAt).toLocaleString()}</p> 
            */}
            
            <div className={styles.btnGroup}>
              <button 
                className={styles.btnClear}
                onClick={clearCart}
                disabled={isProcessing}
              >
                Limpar Carrinho
              </button>
              <button 
                className={styles.checkoutButton}
                onClick={handleCheckout}
                disabled={isProcessing || cartItems.length === 0}
              >
                {isProcessing ? 'Processando...' : 'Finalizar Compra'}
              </button>
            </div>

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}
          </div>
        </>
      ) : (
        <p className={styles.emptyCartMessage}>Seu carrinho está vazio</p>
      )}
    </div>
  );
};

export default ShoppingCart;