"use client"; // 클라이언트 컴포넌트 선언 (훅 사용을 위함)

import styles from './bottom-nav.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: '홈', path: '/', icon: '🏠' },
    { name: '사용자관리', path: '/users', icon: '👥' },
    { name: '계약 관리', path: '/contracts', icon: '📝' },
    { name: '설정', path: '/settings', icon: '⚙️' },
  ];

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        
        return (
          <Link 
            key={item.path} 
            href={item.path} 
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}