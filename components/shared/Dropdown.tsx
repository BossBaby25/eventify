import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model"
import { startTransition, useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { createCategory, getAllCategories } from "@/lib/actions/category.actions"
import { Plus } from "lucide-react"

type DropdownProps = {
  value?: string
  onChangeHandler?: (value: string) => void
}

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory.trim()
    })
      .then((category) => {
        setCategories((prevState) => [...prevState, category])
        setNewCategory('') // Clear input after adding
      })
  }

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[])
    }

    getCategories();
  }, [])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-full h-12 px-3 border-2 border-slate-300 rounded-lg bg-white hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-slate-700">
        <SelectValue placeholder="Select a category" className="text-slate-500" />
      </SelectTrigger>
      <SelectContent className="bg-white border-2 border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
        {categories.length > 0 && categories.map((category) => (
          <SelectItem 
            key={category._id} 
            value={category._id} 
            className="px-3 py-3 text-slate-700 hover:bg-blue-50 focus:bg-blue-50 cursor-pointer transition-colors duration-150 border-b border-slate-100 last:border-b-0"
          >
            <span className="font-medium">{category.name}</span>
          </SelectItem>
        ))}

        <AlertDialog>
          <AlertDialogTrigger className="w-full px-3 py-3 text-left text-blue-600 hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-150 border-t border-slate-200 flex items-center gap-2 font-medium">
            <Plus className="w-4 h-4" />
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white border-2 border-slate-200 rounded-xl shadow-2xl max-w-md">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                New Category
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-600">
                Create a new category for your events. This will be available for all future events.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="py-4">
              <Input 
                type="text" 
                placeholder="Enter category name" 
                value={newCategory}
                className="h-12 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" 
                onChange={(e) => setNewCategory(e.target.value)} 
              />
            </div>

            <AlertDialogFooter className="gap-3">
              <AlertDialogCancel className="h-11 px-6 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => startTransition(handleAddCategory)}
                disabled={!newCategory.trim()}
                className="h-11 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Category
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  )
}

export default Dropdown