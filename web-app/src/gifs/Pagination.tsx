import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Pagination({
  onChange,
  count,
  offset,
  totalCount,
}: {
  onChange: Function,
  count: number,
  offset: number,
  totalCount: number,
}) {
  const start = offset + 1;
  let end = offset + count;
  end = Math.min(end, totalCount);
  const prevOffset = offset - count; 
  const nextOffset = offset + count;
  if (totalCount) {
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={prevOffset < 0}
          onClick={() => onChange(prevOffset)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
            Previous
        </button>
        <button
          disabled={nextOffset > totalCount}
          onClick={() => onChange(nextOffset)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of{' '}
              <span className="font-medium">{totalCount}</span> results
            </p>
          </div>
          <div>
            <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <button
                disabled={prevOffset < 0}
                onClick={() => onChange(prevOffset)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
              </button>
              
              <button
                disabled={nextOffset > totalCount}
                onClick={() => onChange(nextOffset)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    )
  }
  return <></>
}