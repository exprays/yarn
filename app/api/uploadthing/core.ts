import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs";
 
const f = createUploadthing();
 
const handleAuth = () => {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");
    return { userId: userId };
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Uploading server image
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 }}).middleware(() => handleAuth()).onUploadComplete(() => {}),

  //uploading attachments
  messageFile: f(["image", "pdf"]).middleware(() => handleAuth()).onUploadComplete(() => {})

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;