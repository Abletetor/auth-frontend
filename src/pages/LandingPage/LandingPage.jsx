import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import Button from '../../components/Button/Button';
import './LandingPage.css';

const LandingPage = () => {
   const navigate = useNavigate();

   return (
      <div className="landing-page">
         <h1>
            <FaUserPlus className="landing-icon" />
            Welcome to Secure Auth System
         </h1>
         <p>Sign up or log in to continue</p>
         <div className="button-group">
            <Button label={ <><FaUserPlus /> Signup</> } onClick={ () => navigate('/signup') } />
            <Button label={ <><FaSignInAlt /> Login</> } onClick={ () => navigate('/login') } />
         </div>
      </div>
   );
};

export default LandingPage;
