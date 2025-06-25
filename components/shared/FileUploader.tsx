'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { UploadDropzone } from "@/lib/uploadthing"
import { Button } from '@/components/ui/button'

type FileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)

  return (
    <div className="flex items-center justify-center h-72 cursor-pointer flex-col overflow-hidden rounded-lg bg-slate-50 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300">
      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center relative group">
          <img
            src={imageUrl}
            alt="Uploaded image"
            className="w-full h-full object-cover object-center rounded-lg"
          />
          {/* Optional: Add overlay with remove button */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onFieldChange('')
                setFiles([])
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Remove Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full p-4">
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setIsUploading(false)
              if (res && res[0]) {
                onFieldChange(res[0].url)
                console.log("Upload completed:", res[0])
              }
            }}
            onUploadError={(error: Error) => {
              setIsUploading(false)
              console.error(`Upload error: ${error.message}`)
              alert(`Upload failed: ${error.message}`)
            }}
            onUploadBegin={(name) => {
              setIsUploading(true)
              console.log("Upload started:", name)
            }}
            onDrop={(acceptedFiles) => {
              setFiles(acceptedFiles)
              console.log("Files dropped:", acceptedFiles)
            }}
            appearance={{
              container: "w-full h-full flex flex-col items-center justify-center space-y-4",
              uploadIcon: "w-16 h-16 md:w-20 md:h-20 text-slate-400 hover:text-blue-500 transition-colors duration-300",
              label: "text-slate-600 text-base md:text-lg font-semibold mb-2 mt-2 hover:text-blue-600 transition-colors duration-300",
              allowedContent: "text-slate-500 text-sm mb-4",
              button: `
                px-8 py-3 md:px-10 md:py-4 rounded-lg font-semibold text-sm md:text-base shadow-lg transform transition-all duration-200 whitespace-nowrap
                ${isUploading 
                  ? 'bg-slate-400 text-white cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105 hover:shadow-xl active:scale-95'
                }
              `
            }}
            content={{
              label: isUploading ? "Uploading..." : "Drag photo here",
              allowedContent: "SVG, PNG, JPG (max 4MB)",
              button: isUploading ? "Uploading..." : "Select Image"
            }}
            config={{
              mode: "auto"
            }}
          />
        </div>
      )}
    </div>
  )
}