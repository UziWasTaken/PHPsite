import prisma from '../../lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { image, tags = [] } = req.body;

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'imageboard',
    });

    const post = await prisma.post.create({
      data: {
        imageUrl: uploadResponse.secure_url,
        thumbnail: uploadResponse.secure_url,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
} 