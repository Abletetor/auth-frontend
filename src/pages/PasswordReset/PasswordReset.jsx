import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import './PasswordReset.css';

const PasswordReset = () => {
   const { token } = useParams(); // Extracts token from URL
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();

   const handleResetPassword = async (e) => {
      e.preventDefault();
      console.log("Token being sent:", token); // Log token for debugging
      try {
         const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/auth/reset-password/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
         });

         const data = await response.json();
         if (response.ok) {
            setMessage(data.message);

            // Redirect to login after 2 seconds
            setTimeout(() => {
               navigate('/login');
            }, 2000);
         } else {
            setError(data.error);
         }
      } catch (err) {
         setError('An error occurred. Please try again.');
         console.error(err);
      }
   };

   return (
      <div className="reset-password">
         <h2>Reset Your Password</h2>
         <form onSubmit={ handleResetPassword }>
            <Input
               type="password"
               value={ password }
               onChange={ (e) => setPassword(e.target.value) }
               placeholder="Enter your new password"
               required
            />
            <Button label="Reset Password" type="submit" />
         </form>
         { message && <p className="success-message">{ message }</p> }
         { error && <p className="error-message">{ error }</p> }
      </div>
   );
};

export default PasswordReset;
