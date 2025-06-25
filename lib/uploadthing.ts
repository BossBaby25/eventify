// import { generateReactHelpers } from "@uploadthing/react";  // FIXED: Removed /hooks
 
// import type { OurFileRouter } from "@/app/api/uploadthing/core";
 
// export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Generate the UploadButton and UploadDropzone components
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// Generate React helpers for programmatic uploads if needed
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
