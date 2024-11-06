import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import RequestPasswordReset from './pages/RequestPasswordReset/RequestPasswordReset';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import Dashboard from './pages/Dashboard/Dashboard';


export default function App () {
   return (
      <div>
         <Router>
            <Routes>
               <Route path='/' element={ <LandingPage /> } />
               <Route path='/signup' element={ <Signup /> } />
               <Route path='/login' element={ <Login /> } />
               <Route path="/verify-email" element={ <VerifyEmail /> } />
               <Route path="/request-password-reset" element={ <RequestPasswordReset /> } />
               <Route path="/reset-password/:token" element={ <PasswordReset /> } />
               <Route path='/dashboard' element={ <Dashboard /> } />
            </Routes>
         </Router>
      </div>
   );
}
