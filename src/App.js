import React,{useEffect} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

//Components
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';

//contextProvider
import { useStateValue } from './StateProvider';
 
//firebase
import { auth } from './firebase';

//CSS
import './App.css';

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
        <Route path='/login' element={<Login/>}/>
        <Route path='/checkout' element={(
          <div>
            <Header/>
            <Checkout/>
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
