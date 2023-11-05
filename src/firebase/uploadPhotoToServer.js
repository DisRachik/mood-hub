import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './config';

export const uploadPhotoToServer = async (folder, image) => {
  if (image) {
    const res = await fetch(image.uri);
    const file = await res.blob();

    const uniqueId = Date.now().toString();
    const storageRef = ref(storage, `${folder}${uniqueId}`);
    try {
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};

export const deletePhotoFromServer = async (folder, image) => {
  const response = await fetch(image);
  const filename = response.headers.get('Content-Disposition').split(`filename*=utf-8''`)[1];

  const storageRef = ref(storage, `${folder}/${filename}`);
  try {
    await deleteObject(storageRef);
  } catch (error) {
    console.log(error);
  }
};
