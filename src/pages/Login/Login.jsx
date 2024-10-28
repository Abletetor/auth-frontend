import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import './Login.css';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [successMessage, setSuccessMessage] = useState('');
   const navigate = useNavigate();

   const handleLogin = async (e) => {
      e.preventDefault();
      setError('');
      setSuccessMessage('');

      if (!email || !password) {
         return setError("All fields are required.");
      }

      try {
         const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
         });

         if (!response.ok) {
            const errorData = await response.json().catch(() => null); // Catch non-JSON errors
            setError(errorData?.error || "Login failed. Please check your credentials.");
            return;
         }

         const data = await response.json(); // Parse JSON response
         setSuccessMessage("Login successful! Redirecting to dashboard...");

         // Optionally, store token if needed for authorization
         localStorage.setItem('token', data.token);

         // Redirect to dashboard after 2 seconds
         setTimeout(() => {
            navigate('/dashboard');
         }, 2000);
      } catch (err) {
         setError("An error occurred. Please try again.");
         console.error("Login error:", err);
      }
   };


   return (
      <div className="login-page">
         <h2>Log In to Your Account</h2>
         { successMessage && <p className="success-message">{ successMessage }</p> }
         <form onSubmit={ handleLogin }>
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
            <Button label="Log In" type="submit" />
         </form>
         <div className="signup-link">
            <FaUserPlus className="icon" />
            <Link to="/signup">Don&apos;t have an account? Sign up here</Link>
         </div>
         <div className="reset-password-link">
            <Link to="/request-password-reset">Forgot your password?</Link>
         </div>
      </div>
   );
};

export default Login;
