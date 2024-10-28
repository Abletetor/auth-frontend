/* eslint-disable react/prop-types */
import './Button.css';

const Button = ({ label, onClick, type = "button", className }) => (
   <button className={ `custom-button ${className}` } type={ type } onClick={ onClick }>
      { label }
   </button>
);

export default Button;
