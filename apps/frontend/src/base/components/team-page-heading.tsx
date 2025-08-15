import { Heading, Separator } from '@radix-ui/themes';

interface TeamPageHeadingProps {
  teamName: string;
  title: string;
}

export const TeamPageHeading = ({ teamName, title }: TeamPageHeadingProps) => {
  return (
    <Heading as="h1" size="8" className="flex items-center gap-3">
      <span>{teamName}</span>
      <Separator orientation="vertical" size="2" />
      <span>{title}</span>
    </Heading>
  );
};
