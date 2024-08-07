import { useContext, useEffect, useState } from 'react';
import { fetchTrendingGifs } from './api';
import { IGif } from './gif.interface';
import Gif from './Gif';
import { GifsApiResponse } from './gifs-api-response';
import Pagination from './Pagination';
import { AuthContext } from '../auth/AuthContext';

function TrendingGifs() {
  const [gifs, setGifs] = useState<IGif[] | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { user, saveUser } = useContext(AuthContext);

  useEffect(() => {
    async function startFetching() {
      if (!user) return;
      const gifsApiResponse: GifsApiResponse | null = await fetchTrendingGifs(offset, user?.token);
      if (gifsApiResponse) {
        setGifs(gifsApiResponse.data);
        setTotalCount(gifsApiResponse.pagination.total_count);
      } else {
        saveUser(null);
      }
    }
    startFetching();
  }, [offset, user, saveUser]);
  return (
    <>
      <ul className="divide-y divide-gray-200">
        {gifs?.map((gif) => (
          <li key={gif.id} className="py-4 flex">
            <Gif gif={gif}/>
          </li>
        ))}
      </ul>
      <Pagination
        onChange={(offset: number) => {
          setOffset(offset);
        }}
        count={gifs?.length ?? 0}
        offset={offset}
        totalCount={totalCount} />
    </>
  )
}

export default TrendingGifs;
