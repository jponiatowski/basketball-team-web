import { cn } from '@/base/utils';
import NextImage from 'next/image';

interface ImageBlockProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder?: string;
  caption?: string;
}

export const Image = ({
  src,
  alt,
  width,
  height,
  caption,
  placeholder,
}: ImageBlockProps) => {
  return (
    <div className="flex flex-col gap-2">
      <figure
        style={{ aspectRatio: `${width} / ${height}` }}
        className={cn('relative rounded-lg', {
          'mx-auto w-2/3 lg:w-1/2': height > width,
          'w-full': height < width,
        })}
      >
        <NextImage
          src={src}
          alt={alt}
          fill
          placeholder={placeholder ? 'blur' : undefined}
          blurDataURL={placeholder}
          className="h-full w-full rounded-lg object-cover"
        />
      </figure>
      {caption && (
        <figcaption className="text-center text-sm text-gray-500">
          {caption}
        </figcaption>
      )}
    </div>
  );
};
