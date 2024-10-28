import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './VerifyEmail.css';

const VerifyEmail = () => {
   const [message, setMessage] = useState('');
   const [isSuccess, setIsSuccess] = useState(false);
   const query = new URLSearchParams(useLocation().search);
   const token = query.get('token');
   const navigate = useNavigate();

   useEffect(() => {
      const verifyToken = async () => {
         try {
            const response = await fetch(`http://localhost:5000/api/auth/verify-email?token=${token}`);
            const data = await response.json();

            if (response.ok) {
               setMessage(data.message);
               setIsSuccess(true); // Set success state
               // Redirect to login after a short delay
               setTimeout(() => navigate('/login'), 3000);
            } else {
               setMessage(data.message || "Verification failed.");
               setIsSuccess(false); // Set error state
            }
         } catch (error) {
            setMessage("Verification failed.");
            setIsSuccess(false);
            console.log(error);

         }
      };

      if (token) verifyToken();
   }, [token, navigate]);

   return (
      <div className="verify-email-page">
         <h2>Email Verification</h2>
         <p className={ isSuccess ? "success-message" : "error-message" }>{ message }</p>
      </div>
   );
};

export default VerifyEmail;
