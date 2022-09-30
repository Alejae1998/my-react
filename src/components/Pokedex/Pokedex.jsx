import { useSearchParams } from 'react-router-dom';
import { usePokedex } from '../../state/hooks/pokedex';
import PokemonList from './PokemonList';
import Search from './Search';
import styles from './Pokedex.css';

export default function Pokedex() {
  const [searchParams] = useSearchParams();
  const { pokedex, addPage } = usePokedex(searchParams);

  if (!pokedex) return null;

  return (
    <section className={styles.Pokedex}>
      <Search />
      <PokemonList pokedex={pokedex} onLoadNet={addPage} />
    </section>
  );
}
