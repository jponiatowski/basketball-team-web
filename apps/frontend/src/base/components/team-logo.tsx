import { ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface TeamLogoProps {
  logo?: string;
  name: string;
}

export const TeamLogo = ({ logo, name }: TeamLogoProps) => {
  return (
    <>
      {logo ? (
        <figure className="relative size-[50px] flex-shrink-0">
          <Image src={logo} alt={name} fill className="object-contain" />
        </figure>
      ) : (
        <div className="flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-lg bg-gray-200">
          <ImageIcon size={24} />
        </div>
      )}
    </>
  );
};
