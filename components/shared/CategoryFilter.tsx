"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      
      categoryList && setCategories(categoryList as ICategory[])
    }

    getCategories();
  }, [])

  const onSelectCategory = (category: string) => {
    let newUrl = '';

    if(category && category !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: category
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category']
      })
    }

    router.push(newUrl, { scroll: false });
  }

  return (
    <div className="w-full max-w-xs">
      <Select onValueChange={(value) => onSelectCategory(value)}>
        <SelectTrigger className="w-full h-11 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out">
          <SelectValue 
            placeholder="Select category" 
            className="text-gray-700 placeholder:text-gray-500"
          />
        </SelectTrigger>
        <SelectContent className="w-full max-h-60 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-1">
            <SelectItem 
              value="All"
              className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 rounded-md cursor-pointer transition-colors duration-150 ease-in-out"
            >
              All Categories
            </SelectItem>
            {categories.map((category) => (
              <SelectItem 
                key={category._id}
                value={category.name}
                className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 rounded-md cursor-pointer transition-colors duration-150 ease-in-out"
              >
                {category.name}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  )
}

export default CategoryFilter