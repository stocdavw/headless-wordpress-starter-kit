import Link from 'next/link';
import Image from 'next/image';
import styles from './nav.module.css';

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.logoLink}>
                <Image
                    src="/logo.png"
                    alt="Site Logo"
                    width={40}
                    height={40}
                    className={styles.logo}
                />
                <span className={styles.siteTitle}>Headless WP Starter Kit</span>
            </Link>
        </nav>
    );
}
