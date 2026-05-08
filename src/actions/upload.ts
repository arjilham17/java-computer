"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const extension = file.name.split(".").pop();
    const filename = `${randomUUID()}.${extension}`;
    
    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    const path = join(uploadDir, filename);
    await writeFile(path, buffer);

    // Return the public URL
    return { url: `/uploads/${filename}` };
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Failed to upload image");
  }
}

export async function deleteLocalImage(url: string) {
  // Optional: implement deletion logic if needed
  // Careful with path traversal!
}
