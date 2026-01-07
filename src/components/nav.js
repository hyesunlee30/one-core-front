"use client";

import styles from './nav.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  const menuItems = [
    { name: '대시보드', path: '/', icon: '📊' },
    { name: '사용자 관리', path: '/users', icon: '👥' },
    { name: '계약 관리', path: '/contracts', icon: '📝' },
    { name: '설정', path: '/settings', icon: '⚙️' },
  ];

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>ONECORE HR</div>
      <ul className={styles.menuList}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <li key={item.path}>
              <Link 
                href={item.path} 
                className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}