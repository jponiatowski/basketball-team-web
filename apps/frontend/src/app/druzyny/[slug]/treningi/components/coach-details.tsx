import { cn } from '@/base/utils';
import { MailIcon, PhoneIcon } from 'lucide-react';

interface CoachDetailsProps {
  name: string;
  phone: string;
  email: string;
}

export const CoachDetails = ({ name, phone, email }: CoachDetailsProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm font-bold">{name}</div>
      <div className={cn('text-sm', 'flex items-center gap-1')}>
        <PhoneIcon size={12} />
        {phone}
      </div>
      <div className={cn('text-sm', 'flex items-center gap-1')}>
        <MailIcon size={12} />
        {email}
      </div>
    </div>
  );
};
