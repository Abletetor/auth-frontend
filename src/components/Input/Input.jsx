/* eslint-disable react/prop-types */
import './Input.css';

const Input = ({ type = "text", placeholder, value, onChange, className }) => (
   <input
      className={ `custom-input ${className}` }
      type={ type }
      placeholder={ placeholder }
      value={ value }
      onChange={ onChange }
   />
);

export default Input;
