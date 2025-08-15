import { Image } from '@/base/types';
import NextImage from 'next/image';
import { Text, Tooltip } from '@radix-ui/themes';
import { CoachDetails } from './coach-details';

interface CoachAvatarProps {
  name: string;
  image: Image;
  phone: string;
  email: string;
}

export const CoachAvatar = ({
  name,
  image,
  phone,
  email,
}: CoachAvatarProps) => {
  return (
    <Tooltip content={<CoachDetails name={name} phone={phone} email={email} />}>
      <NextImage
        className="h-10 w-10 rounded-full border-2 border-white object-cover object-top"
        src={image.url}
        alt={name}
        placeholder="blur"
        blurDataURL={image.placeholder}
        width={40}
        height={40}
      />
    </Tooltip>
  );
};
