import Menu from './Menu.jsx';
import Navigation from '../Navigation/Navigation';
import User from './User';
import styles from './Header.css';

const primary = [
  { to: '/', label: 'Home' },
  { to: 'pokedex', label: 'Pokedex' },
  //{ to: 'fuzzy-bunny', label: 'Fuzzy Bunny' },
  { to: 'about', label: 'About' },
  { to: 'wat', label: 'Wat' },
];

export default function Header() {
  return (
    <header className={styles.Header}>
      <div className={styles.MenuContainer}>
        <Menu navigation={primary} />
      </div>
      <h1>My React Template</h1>
      <div className={styles.NavigationContainer}>
        <Navigation navigation={primary} />
      </div>
      <User />
    </header>
  );
}
