import { useContext, useState } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { IGif } from './gif.interface';
import { addOrder } from '../orders/api';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function Gif({gif}: {gif: IGif}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  async function buy() {
    if (!user) return;
    setIsLoading(true);
    await addOrder(user?.token, gif);
    navigate('/orders');
    window.location.href = 'https://www.paypal.com/';
    setIsLoading(false);
  }
  if (isLoading) return (
    <>
      <p>Loading...</p>
    </>
  );
  return (
    <>
      <img className="h-10 w-10 rounded-full" src={gif.images.original.url} alt="" />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{gif.title}</p>
          <p className="text-sm text-gray-500">{gif.url}</p>
        </div>
        <span className="sm:ml-3">
        <button
          onClick={buy}
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 absolute right-10"
        >
        <CurrencyDollarIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
          Buy
        </button>
      </span>
    </>
  )
}

export default Gif;
