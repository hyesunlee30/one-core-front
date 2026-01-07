import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h2 className={styles.pageTitle}>Dashboard</h2>
      <div className={styles.userActions}>
        <button className={styles.iconBtn}>🔔</button>
        <div className={styles.profile}>
          <span>Admin님</span>
        </div>
      </div>
    </header>
  );
}