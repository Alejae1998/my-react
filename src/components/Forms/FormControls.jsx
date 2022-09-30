import { Children, cloneElement, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './FormControls.css';


function FormControl({ label, children, className: customClassName }) {
  const className = classNames(styles.FormControl, customClassName);

  return (
    <label className={className}>
      <LabelText text={label} />
      {children}
    </label>
  );
} 

function LabelText({ text, as: Tag = 'span'}) {
  if (!text) return null;

  const className = classNames(style.Label, 'label-text');
  return <Tag className={className}>{text}</Tag>;
}


