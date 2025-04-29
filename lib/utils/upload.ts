import { put } from '@vercel/blob';
import { nanoid } from 'nanoid';

export async function uploadProductImage(file: File) {
  try {
    const filename = `${nanoid()}-${file.name}`;
    const response = await put(filename, file, {
      access: 'public',
    });
    
    return {
      url: response.url,
      success: true,
    };
  } catch (error) {
    console.error('Image upload error:', error);
    return {
      url: '',
      success: false,
      error: 'Failed to upload image',
    };
  }
}