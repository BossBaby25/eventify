"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search as SearchIcon, X } from 'lucide-react';

const Search = ({ placeholder = 'Search events...' }: { placeholder?: string }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';

      if(query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query']
        })
      }

      router.push(newUrl, { scroll: false });
    }, 300)

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router])

  const clearSearch = () => {
    setQuery('');
  }

  return (
    <div className="relative w-full group">
      <div className="flex items-center w-full h-9 bg-white border-2 border-slate-200 rounded-xl px-4 gap-3 transition-all duration-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 shadow-sm hover:shadow-md">
        
        {/* Search Icon */}
        <div className="flex-shrink-0">
          <SearchIcon className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
        </div>

        {/* Input Field */}
        <Input 
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-0 bg-transparent p-0 text-slate-700 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 font-medium"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={clearSearch}
            className="flex-shrink-0 w-6 h-6 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            type="button"
            aria-label="Clear search"
          >
            <X className="w-3 h-3 text-slate-600" />
          </button>
        )}
      </div>

      {/* Search Results Indicator */}
      {query && (
        <div className="absolute top-full left-0 right-0 mt-2 z-10">
          <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <SearchIcon className="w-4 h-4" />
              <span>Searching for: <span className="font-semibold text-slate-800">"{query}"</span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search