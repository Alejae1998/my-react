import { useState } from 'react';
import { useFamilyActions } from '../../state/hooks/fuzzyBunny.js';
import { InputControl, FormButton } from '../Forms/FormControls.jsx';
import styles from './AddFamily.css';

export default function AddFamily() {
  const { add } = useFamilyActions();
  const [name, setName] = useState('');
  const handleChange = ({ target }) => setName(target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await add({ name });
    setName('');
  };

  return (
    <form className={styles.AddFamily} onSubmit={handleSubmit}>
      <InputControl
        label="Add a Family"
        name="pokemon"
        placeholder="Enter your family"
        value={name}
        onChange={handleChange}
      />

      <FormButton>Add Family</FormButton>
    </form>
  );
}
