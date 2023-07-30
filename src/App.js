import React,{useEffect} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

//Components
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Orders from './Orders';

//contextProvider
import { useStateValue } from './StateProvider';
 
//firebase
import { auth } from './firebase';

//stripe
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

//CSS
import './App.css';
import Payment from './Payment';

const promise=loadStripe('pk_test_51NYxHMSDoiKHF49gd3jx5VkUMazlunn9qnJQQlwx364YlJhWMwLb2FwTgyCyFquUzhCBzJaZ6jZ2JmTBVlLy4ODQ00xF0ueMxs');

function App() {
  const [{},dispatch]=useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
    <div className='app'>
      <Routes>
        <Route path='/orders' element={
          <div>
            <Header/>
            <Orders/>
          </div>
        }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/checkout' element={(
          <div>
            <Header/>
            <Checkout/>
          </div>
        )}/>
        <Route path='/payment'element={(
          <div>
            <Header/>
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
          </div>
        )}/>
        <Route path='/' element={(
          <div>
            <Header/>
            <Home/>
          </div>
        )}/>
      </Routes> 
    </div>
    </Router>
  );
}

export default App;
