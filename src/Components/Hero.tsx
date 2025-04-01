import styles from './Hero.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import Cafe from './pngtree-cappuccino-png-transparent-layer-material-png-image_4255197 (1).png';
import { useEffect, useRef } from 'react';

export function Hero(){
    // Corrigindo a tipagem da ref
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (imageRef.current) {
            // Agora o TypeScript sabe que imageRef.current é um HTMLDivElement
            imageRef.current.style.animation = `${styles.slideIn} 1s ease-out forwards`;
        }
    }, []);

    return(
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                    Enjoy your <span className={styles.highlight}>coffee</span> before your activity
                </h1>
                <p className={styles.heroDescription}>
                    Start your day with a perfect cup of coffee that energizes you for whatever lies ahead. 
                    Our carefully selected beans ensure a rich and satisfying experience.
                </p>
                <div className={styles.heroButtons}>
                    <a href="#" className={styles.btnPrimary}>
                        Order now <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                    <a href="#" className={styles.btnSecondary}>More menu</a>
                </div>
            </div>
            
            {/* Aqui estamos referenciando uma div, então usamos HTMLDivElement */}
            <div className={styles.heroImageContainer} ref={imageRef}>
                <div className={styles.heroImageCircle}>
                    <img 
                        src={Cafe} 
                        alt="Cappuccino" 
                        className={styles.heroImage} 
                    />
                    <div className={styles.productLabel}>Cappuccino</div>
                    <div className={styles.productTags}>
                        <div className={styles.tag}>
                            <FontAwesomeIcon icon={faStar} /> 4.8
                        </div>
                        <div className={styles.tag}>
                            <FontAwesomeIcon icon={faShoppingBag} /> 18K
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}