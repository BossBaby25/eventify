import { generateReactHelpers } from "@uploadthing/react";  // FIXED: Removed /hooks
 
import type { OurFileRouter } from "@/app/api/uploadthing/core";
 
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();