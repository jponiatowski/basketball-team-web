import { Coach } from '@/base/types';
import { CoachAvatar } from './coach-avatar';

interface AvatarsGroupProps {
  coaches: Coach[];
}

export const AvatarsGroup = ({ coaches }: AvatarsGroupProps) => {
  return (
    <div className="flex -space-x-4 rtl:space-x-reverse">
      {coaches.map((coach) => (
        <CoachAvatar
          key={coach.id}
          name={coach.name}
          image={coach.image}
          phone={coach.contactDetails.phone}
          email={coach.contactDetails.email}
        />
      ))}
    </div>
  );
};
