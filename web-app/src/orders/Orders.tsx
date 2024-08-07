import { useContext, useEffect, useState } from 'react';
import { fetchOrders } from './api';
import { Order } from './order';

import { AuthContext } from '../auth/AuthContext';

function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const { user, saveUser } = useContext(AuthContext);

  useEffect(() => {
    async function startFetching() {
      if (!user) return;
      const orders: Order[] | null = await fetchOrders(user?.token);
      if (orders) {
        setOrders(orders);
      } else {
        saveUser(null);
      }
    }
    startFetching();
  }, [user, saveUser]);
  return (
    <>
      <ul className="divide-y divide-gray-200">
        {orders?.map((order) => (
          <li key={order.id} className="py-4 flex">
            <img className="h-10 w-10 rounded-full" src={order.gif.images.original.url} alt="" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{order.gif.title}</p>
              <p className="text-sm text-gray-500">{order.gif.url}</p>
              <p className="text-sm text-gray-500">{order.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Orders;
