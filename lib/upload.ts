import axios from 'axios';

export async function uploadImage(file: File): Promise<string> {
  const authRes = await fetch('/api/imagekit/auth');
  const auth = await authRes.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', file.name);
  formData.append('publicKey', process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
  formData.append('signature', auth.signature);
  formData.append('expire', auth.expire);
  formData.append('token', auth.token);
  formData.append('folder', '/products');

  const response = await axios.post('https://upload.imagekit.io/api/v1/files/upload', formData);
  return response.data.url;
}
