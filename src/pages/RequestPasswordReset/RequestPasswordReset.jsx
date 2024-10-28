import { useState } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import './RequestPasswordReset.css';

const RequestPasswordReset = () => {
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
   const [error, setError] = useState('');

   const handleRequestReset = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/auth/request-password-reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
         });

         const data = await response.json();
         if (response.ok) {
            setMessage(data.message);
         } else {
            setError(data.message);
         }
      } catch (err) {
         setError('An error occurred. Please try again.');
         console.error(err);
      }
   };

   return (
      <div className="request-password-reset">
         <h2>Request Password Reset</h2>
         <form onSubmit={ handleRequestReset }>
            <Input
               type="email"
               value={ email }
               onChange={ (e) => setEmail(e.target.value) }
               placeholder="Enter your email"
               required
            />
            <Button label="Request Reset" type="submit" />
         </form>
         { message && <p className="success-message">{ message }</p> }
         { error && <p className="error-message">{ error }</p> }
      </div>
   );
};

export default RequestPasswordReset;
