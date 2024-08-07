import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDebounceCallback } from "usehooks-ts";

export default function SearchBar({
  onChange,
  searchTerm,
}: {
  onChange: Function,
  searchTerm: string,
}) {

  const debounced = useDebounceCallback((value) => onChange(value), 1000);

  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5" />
        </div>
        <input
          id="search"
          name="search"
          type="text"
          defaultValue={searchTerm}
          onChange={event => debounced(event.target.value)}
          placeholder="Enter search term"
          className="block w-full rounded-md border-0 py-1.5 pl-11 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  )
}