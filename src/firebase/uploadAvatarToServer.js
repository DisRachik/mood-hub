import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './config';

export const uploadAvatarToServer = async (folder, avatar) => {
  if (avatar) {
    const res = await fetch(avatar.uri);
    const file = await res.blob();

    const uniqueId = Date.now().toString();
    const storageRef = ref(storage, `${folder}${uniqueId}`);
    try {
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error(error);
    }
  }
  return null;
};
