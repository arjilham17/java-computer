import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadImage(file: File, folder: string = "products"): Promise<string> {
  const fileName = `${folder}/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, fileName);
  const uploadTask = await uploadBytesResumable(storageRef, file);
  const downloadURL = await getDownloadURL(uploadTask.ref);
  return downloadURL;
}
