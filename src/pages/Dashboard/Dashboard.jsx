import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Button from '../../components/Button/Button';
import { FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
   const [user, setUser] = useState(null);
   const [error, setError] = useState('');
   const navigate = useNavigate();

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const token = localStorage.getItem('token');
            if (!token) {
               setError("No token found. Redirecting to login...");
               setTimeout(() => navigate('/login'), 2000);
               return;
            }

            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/user/dashboard`, {
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
               },
            });

            console.log("Response status:", response.status); // Log the response status

            if (response.ok) {
               const data = await response.json();
               setUser(data);
            } else {
               const errorData = await response.json(); // Log detailed error response
               console.error("Fetch error:", errorData);
               throw new Error('Failed to fetch user data.');
            }
         } catch (error) {
            console.error("An error occurred:", error);
            setError("An error occurred. Redirecting to login...");
            setTimeout(() => navigate('/'), 2000);
         }
      };


      fetchUserData();
   }, [navigate]);

   const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
   };

   if (error) return <p className="error-message">{ error }</p>;
   if (!user) return <p>Loading...</p>;

   return (
      <div className="dashboard">
         <h2>Welcome, { user.name }!</h2>
         <p>We&apos;re thrilled to have you as part of our community! Your journey begins here, and we’re dedicated to supporting you every step of the way.</p>
         <div className="user-info">
            <p><strong>Email:</strong> { user.email }</p>
            <p><strong>Member since:</strong> { user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A' }</p>
         </div>
         <p>Explore our features, connect with others, and make the most of your account. If you ever need assistance, we&apos;re just a click away!</p>
         <Button label="Logout" onClick={ handleLogout } icon={ <FaSignOutAlt /> } className='logout-button' />
      </div>

   );
};

export default Dashboard;
