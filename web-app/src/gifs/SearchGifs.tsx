import { useContext, useEffect, useState } from 'react';
import { fetchGifs } from './api';
import Gif from './Gif';
import { GifsApiResponse } from './gifs-api-response';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { AuthContext } from '../auth/AuthContext';
import { IGif } from './gif.interface';

function SearchGifs() {
  const [gifs, setGifs] = useState<IGif[] | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { user, saveUser } = useContext(AuthContext);

  useEffect(() => {
    async function startFetching() {
      if (!user) return;
      const gifsApiResponse: GifsApiResponse | null = await fetchGifs(offset, searchTerm, user?.token);
      if (gifsApiResponse) {
        setGifs(gifsApiResponse.data);
        setTotalCount(gifsApiResponse.pagination.total_count);
      } else {
        saveUser(null);
      }
    }
    startFetching();
  }, [offset, searchTerm, user, saveUser]);
  return (
    <>
      <SearchBar onChange={(searchTerm: string) => {
          setSearchTerm(searchTerm);
        }}
        searchTerm={searchTerm}
      />
      <ul className="divide-y divide-gray-200">
        {gifs?.map((gif) => (
          <li key={gif.id} className="py-4 flex">
            <Gif gif={gif}/>
          </li>
        ))}
      </ul>
      <p><i>{gifs === null ?? 'Loading...'}</i></p>
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

export default SearchGifs;
