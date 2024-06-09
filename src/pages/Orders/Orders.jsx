import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../Utility/firebase';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import classes from './Orders.module.css';
import ProductCard from '../../Components/product/ProductCard';

const Orders = () => {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection('users')
        .doc(user.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });

      // Cleanup function to unsubscribe from the snapshot listener
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]); // Dependency array includes 'user'

  return (
    <section className={classes.container}>
      <div className={classes.orders__container}>
        <h1>Your Orders</h1>
        <div style={{padding:'20px'}}>
          {orders?.length === 0 && <div>You don't have orders yet </div>


          }
        </div>
        {/* Ordered items */}
        <div >
          {orders.map((eachOrder, i) => (
            <div key={i}>
              <hr />
              <p>Order ID: {eachOrder.id}</p>
              {eachOrder.data.basket?.map((order) => (
                <ProductCard flex={true} product={order} key={order.id} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Orders;
