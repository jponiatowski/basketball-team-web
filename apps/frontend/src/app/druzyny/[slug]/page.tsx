import { Heading, Link, Separator } from '@radix-ui/themes';
import { getTeamPageData, getTeamSeoData } from './actions';
import Image from 'next/image';
import { Breadcrumbs } from '@/base/components/breadcrumbs';
import { Metadata, ResolvingMetadata } from 'next';
import { TeamPageHeading } from '@/base/components/team-page-heading';

interface TeamPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: TeamPageProps): Promise<Metadata> {
  const slug = (await params).slug;

  const seo = await getTeamSeoData(slug);

  return {
    title: seo?.title,
    description: seo?.description,
    openGraph: {
      title: seo?.title,
      description: seo?.description,
      images: seo?.image?.url,
    },
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params;
  const team = await getTeamPageData(slug);

  return (
    <div className="flex flex-col gap-8 rounded-lg bg-white p-8">
      <Breadcrumbs
        items={[
          { label: 'Strona główna', href: '/' },
          { label: team.name ?? 'Drużyna', current: true },
        ]}
      />
      <TeamPageHeading teamName={team.name} title="Drużyna" />
      {team.image?.url && (
        <figure className="relative mx-auto aspect-[16/9] w-full rounded-lg lg:w-3xl">
          <Image
            src={team.image?.url ?? ''}
            placeholder="blur"
            blurDataURL={team.image?.placeholder ?? ''}
            alt={team.name ?? ''}
            fill
            className="rounded-lg object-cover object-center"
          />
        </figure>
      )}
      <Heading as="h2" size="7">
        Trenerzy
      </Heading>
      <div className="flex w-full flex-wrap items-center justify-center gap-8 lg:items-start lg:justify-start">
        {team.coach?.map((coach) => (
          <Link
            href={`/trenerzy/${coach.slug.current}`}
            key={coach._id}
            aria-label={coach.name}
          >
            <div className="group flex w-fit cursor-pointer flex-col gap-2">
              <figure className="relative size-60 rounded-lg">
                <Image
                  className="rounded-lg object-cover object-top"
                  src={coach.image?.asset?.url ?? ''}
                  alt={coach.name}
                  fill
                  sizes="264px"
                />
              </figure>
              <h3 className="text-center !text-xl font-bold tracking-tight text-gray-900 transition-all duration-300 ease-in-out group-hover:underline">
                {coach.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      <Separator size="4" />
      <Heading as="h2" size="7">
        Zawodnicy
      </Heading>
      <div className="flex flex-wrap items-center justify-center gap-8 lg:items-start lg:justify-start">
        {team.players?.map((player) => (
          <Link
            key={player.id}
            href={`/zawodnicy/${player.id}`}
            aria-label={player.firstName}
          >
            <div className="group flex w-52 flex-col gap-2">
              <figure className="relative size-52 rounded-lg">
                <Image
                  src={player.photo ?? ''}
                  alt={`${player.firstName} ${player.lastName}`}
                  fill
                  className="rounded-lg object-cover object-top"
                  sizes="160px"
                />
              </figure>
              <h3 className="text-center !text-xl font-bold tracking-tight text-gray-900 transition-all duration-300 ease-in-out group-hover:underline">
                {player.firstName} {player.lastName}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
