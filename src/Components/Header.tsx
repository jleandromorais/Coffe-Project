import { Link, useNavigate } from 'react-router-dom';
import styles from "./Header.module.css";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoIcon}>
          <i className="fas fa-mug-hot"></i>
        </div>
        <span className={styles.logoText}>Café Street</span>
      </Link>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li><Link to="/" className={styles.navLink}>Home</Link></li>
          <li><Link to="/products" className={styles.navLink}>Produtos</Link></li>
          <li><Link to="/about" className={styles.navLink}>Sobre nós</Link></li>
          <li><Link to="/delivery" className={styles.navLink}>Delivery</Link></li>
        </ul>
      </nav>

      <div className={styles.headerIcons}>
        <button className={styles.iconBtn} aria-label="Pesquisar">
          <i className="fas fa-search"></i>
        </button>
        <button 
          className={styles.iconBtn} 
          aria-label="Carrinho de compras"
          onClick={() => navigate('/cart')}
        >
          <i className="fas fa-shopping-bag"></i>
          <span className={styles.cartCount}>2</span>
        </button>
      </div>
    </header>
  );
}