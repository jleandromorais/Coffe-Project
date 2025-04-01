import React from 'react';
import styles from './Pop.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import capputino from '../img/11135999.png';
import ice from '../img/images.jpg';
import mocho from '../img/48956_shutterstock-686698384.webp'
import { useCart } from './useCart';
// Defina o tipo para os dados do café
export interface CoffeeItem {
  id: number;
  name: string;
  description: string;
  price: string;
  rating: string;
  image: string;
  tag: 'hot' | 'cold';
}


export const Pop: React.FC = () => {
  const { addToCart } = useCart();

  const coffeeItems: CoffeeItem[] = [
    {
      id: 1,
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and foam',
      price: '$4.99',
      rating: '4.8',
      image: capputino,
      tag: 'hot'
    },
    {
      id: 2,
      name: 'Iced Latte',
      description: 'Espresso with cold milk and ice',
      price: '$5.49',
      rating: '4.7',
      image: ice,
      tag: 'cold'
    },
    {
      id: 3,
      name: 'Mocha',
      description: 'Espresso with chocolate and steamed milk',
      price: '$5.29',
      rating: '4.9',
      image: mocho,
      tag: 'hot'
    }
  ];

  return (
    <section className={styles.popularNow}>
      <div className={styles.waveDivider}></div>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Popular Now</h2>
        <div className={styles.coffeeGrid}>
          {coffeeItems.map((coffee) => (
            <div key={coffee.id} className={styles.coffeeCard}>
              <div className={styles.coffeeImage}>
                <img src={coffee.image} alt={coffee.name} />
                <div className={styles.rating}>
                  <span>{coffee.rating}</span>
                  <FontAwesomeIcon icon={faStar} />
                </div>
              </div>
              <div className={styles.coffeeInfo}>
                <h3>{coffee.name}</h3>
                <p className={styles.description}>{coffee.description}</p>
                <div className={styles.cardFooter}>
                  <span className={`${styles.tag} ${styles[coffee.tag]}`}>
                    {coffee.tag === 'hot' ? 'Hot' : 'Cold'}
                  </span>
                  <span className={styles.price}>{coffee.price}</span>
                </div>
                <button 
        className={styles.buyButton}
        onClick={() => addToCart(coffee)} // ← Agora funciona!
      >
        Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};