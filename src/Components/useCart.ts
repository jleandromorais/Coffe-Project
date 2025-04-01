// Importa o hook useState do React para gerenciar estado
import { useState } from 'react';
// Importa a interface CoffeeItem definida no componente Pop
import { CoffeeItem } from './Pop';

// Define uma nova interface CartItem que estende CoffeeItem
// Adiciona a propriedade quantity para controlar a quantidade no carrinho
interface CartItem extends CoffeeItem {
  quantity: number;
}

// Exporta o hook personalizado useCart
export const useCart = () => {
  // Cria o estado cart inicializado como array vazio
  // O tipo é CartItem[] (array de CartItem)
  // setCart é a função para atualizar o estado
  const [cart, setCart] = useState<CartItem[]>([]);

  // Define a função para adicionar itens ao carrinho
  // Recebe um produto do tipo CoffeeItem como parâmetro
  const addToCart = (product: CoffeeItem) => {
    // Atualiza o estado do carrinho usando a função setCart
    // Recebe o estado anterior (prev) como parâmetro
    setCart(prev => {
      // Verifica se o produto já existe no carrinho
      // find retorna o primeiro item que satisfaz a condição ou undefined
      const existingItem = prev.find(item => item.id === product.id);
      
      // Se o produto já existe no carrinho
      if (existingItem) {
        // Retorna um novo array com o produto atualizado
        return prev.map(item =>
          // Para cada item no carrinho:
          // Se for o produto que estamos adicionando
          item.id === product.id
            // Atualiza incrementando a quantidade (copia todas propriedades e sobrescreve quantity)
            ? { ...item, quantity: item.quantity + 1 }
            // Se não for o produto, mantém inalterado
            : item
        )
      }
      
      // Se o produto NÃO existe no carrinho:
      // Retorna um novo array com todos os itens anteriores (...prev)
      // e adiciona o novo produto com quantity = 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Retorna um objeto com:
  // - cart: estado atual do carrinho
  // - addToCart: função para adicionar itens
  return { cart, addToCart };
};