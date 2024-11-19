import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

export async function createResponsiveImage(
  image: ImageMetadata,
  alt: string
) {
  const breakpoints = [320, 640, 768, 1024, 1280];
  
  const images = await Promise.all(
    breakpoints.map(async (width) => {
      const resizedImage = await getImage({
        src: image,
        width,
        format: 'webp',
      });
      return {
        ...resizedImage,
        width,
      };
    })
  );

  return {
    src: image.src,
    width: image.width,
    height: image.height,
    alt,
    srcset: images
      .map((img) => `${img.src} ${img.width}w`)
      .join(', '),
    sizes: '(min-width: 1280px) 1280px, 100vw'
  };
}