import { cn } from '@/base/utils';
import { MailIcon, PhoneIcon } from 'lucide-react';

interface CoachDetailsProps {
  name: string;
  phone: string;
  email: string;
}

const linkStyles = cn('text-sm hover:!underline', 'flex items-center gap-1');

export const CoachDetails = ({ name, phone, email }: CoachDetailsProps) => {
  return (
    <span className="flex flex-col gap-1">
      <span className="text-sm font-bold">{name}</span>
      <a href={`tel:${phone}`} className={linkStyles}>
        <PhoneIcon size={12} />
        {phone}
      </a>
      <a href={`mailto:${email}`} className={linkStyles}>
        <MailIcon size={12} />
        {email}
      </a>
    </span>
  );
};
