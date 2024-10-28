import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import './Signup.css';

const Signup = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [successMessage, setSuccessMessage] = useState('');

   const handleSignup = async (e) => {
      e.preventDefault();
      setError('');
      setSuccessMessage('');

      if (!name || !email || !password) {
         return setError("All fields are required.");
      }

      try {
         const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
         });

         if (response.ok) {
            setSuccessMessage("Signup successful! Please check your email to verify your account.");
         } else {
            setError("Signup failed.");
         }
      } catch (err) {
         setError("An error occurred. Please try again.");
         console.log(err);
      }
   };

   return (
      <div className="signup-page">
         <h2>Create Your Account</h2>
         { successMessage ? (
            <p className="success-message">{ successMessage }</p>
         ) : (
            <form onSubmit={ handleSignup }>
               <Input
                  type="text"
                  placeholder="Name"
                  value={ name }
                  onChange={ (e) => setName(e.target.value) }
               />
               <Input
                  type="email"
                  placeholder="Email"
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
               />
               <Input
                  type="password"
                  placeholder="Password"
                  value={ password }
                  onChange={ (e) => setPassword(e.target.value) }
               />
               { error && <p className="error-message">{ error }</p> }
               <Button label="Sign Up" type="submit" />
            </form>
         ) }
         <div className="login-link">
            <FaSignInAlt className="icon" />
            <Link to="/login">Already have an account? Log in here</Link>
         </div>
      </div>
   );
};

export default Signup;
