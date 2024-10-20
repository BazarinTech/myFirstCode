import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Navbar from './components/navbar';
import { createContext, lazy, Suspense, useContext, useEffect, useRef, useState } from 'react';
import Login from './pages/login';
import Register from './pages/register';
import Navbar2 from './components/navbar2';
import LoadingBar from 'react-top-loading-bar';
// import Home2 from './pages/home2';
// import Order2 from './pages/order2';
// import Profile2 from './pages/profile2';
const Team = lazy(() => import('./pages/team'));
const Home2 = lazy(() => import('./pages/home2'));
const Profile2 = lazy(() => import('./pages/profile2'));
const Order2 = lazy(() => import('./pages/order2'));
const Recharge = lazy(() => import('./pages/recharge'));
const Transactions = lazy(() => import('./pages/transaction'));
const Account = lazy(() => import('./pages/account'));
const Cashout = lazy(() => import('./pages/cashout'));
const Group = lazy(() => import('./pages/group'));

const LoadingBarHandler = () => {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Start the loading bar when the route changes
    ref.current.continuousStart();

    // Simulate loading time (or wait for async data fetching)
    setTimeout(() => {
      ref.current.complete();
    }, 1000); // Adjust the delay as necessary

  }, [location]); // This runs every time the route changes

  return <LoadingBar color="rgb(3, 157, 247)" ref={ref}  height={4}/>;
};

function App() {

  const [navStatus, editNavStatus] = useState(true)
  function handleNav(status) {
    editNavStatus(status)
  }

  return (  
    <BrowserRouter>
    <LoadingBarHandler />
    <Suspense fallback={<div style={{marginTop: '200px'}} className='grid-center'><span className='spinner'></span></div>}>
    <Routes>
        <Route path='/home' element={<Home2 handleNav={handleNav}/>}/>
        <Route path='/profile' element={<Profile2 handleNav={handleNav} />}/>
        <Route path='/team' element={<Team handleNav={handleNav} />}/>
        <Route path='/order' element={<Order2 handleNav={handleNav} />}/>
        <Route path='/recharge' element={<Recharge handleNav={handleNav} />}/>
        <Route path='/transaction' element={<Transactions handleNav={handleNav}  />}/>
        <Route path='/account' element={<Account handleNav={handleNav}  />}/>
        <Route path='/cashout' element={<Cashout handleNav={handleNav} />}/>
        <Route path='/group' element={<Group handleNav={handleNav} />}/>
        <Route path='/' element={<Login handleNav={handleNav} />}/>
        <Route path='/register' element={<Register handleNav={handleNav}/>}/>
      </Routes>
      <Navbar display={navStatus}/>
    </Suspense>
      
    </BrowserRouter>
  );
}

export default App;
