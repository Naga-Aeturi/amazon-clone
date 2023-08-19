import React,{useEffect, useState} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { db } from '../firebase';

//Components
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Orders from './Orders';
import Payment from './Payment';
import Register from './Register';

//contextProvider
import { useStateValue } from '../StateProvider';
 
//firebase
import { auth } from '../firebase';

//stripe
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise=loadStripe('pk_test_51NYxHMSDoiKHF49gd3jx5VkUMazlunn9qnJQQlwx364YlJhWMwLb2FwTgyCyFquUzhCBzJaZ6jZ2JmTBVlLy4ODQ00xF0ueMxs');

function App() {
  const [{},dispatch] = useStateValue();
  const [ productUIDs, setProductUIDs ] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('Products')
      .onSnapshot(snapshot => {
        const uids = snapshot.docs.map(doc => doc.id);
        setProductUIDs(uids);
      });

    return () => {
        unsubscribe();
    };
  }, [db]);

  useEffect(() => {
    if (productUIDs.length > 0) {
      const fetchProductFields = async () => {
        const promises = productUIDs.map(async uid => {
          const productDoc = await db.collection('Products').doc(uid).get();
          return { id: uid, data: productDoc.data() };
        });

        Promise.all(promises)
          .then(results => {
            dispatch({
                type: "SET_PRODUCTS",
                item: results
            });
            dispatch({
              type: "SET_FILTERED_PRODUCTS",
              item: results
          });
          })
          .catch(error => {
            console.error('Error fetching product fields: ', error);
          });
      };
      fetchProductFields();
    }
  }, [db, productUIDs]);

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
        <Route path='/Register' element={<Register/>}/>
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
