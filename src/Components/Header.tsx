import React from 'react';
import styles from "./Header.module.css";


export function Header() {
  return (
    <header className={styles.header}>
      <a href="index.html" className={styles.logo}>
        <div className={styles.logoIcon}>
          <i className="fas fa-mug-hot"></i>
        </div>
        <span className={styles.logoText}>Café Street</span>
      </a>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
        <li><a href="#" className={styles.navLink}>Home</a></li>
          <li><a href="#" className={styles.navLink}>Produtos</a></li>
          <li><a href="#" className={styles.navLink}>Sobre nós</a></li>
          <li><a href="#" className={styles.navLink}>Delivery</a></li>
        </ul>
      </nav>

      <div className={styles.headerIcons}>
        <button className={styles.iconBtn} aria-label="Pesquisar">
          <i className="fas fa-search"></i>
        </button>
        <button className={styles.iconBtn} aria-label="Carrinho de compras">
          <i className="fas fa-shopping-bag"></i>
          <span className={styles.cartCount}>2</span>
        </button>
      </div>

      <button className={styles.mobileMenuBtn} aria-label="Menu">
        <i className="fas fa-bars"></i>
      </button>
    </header>
  );
}