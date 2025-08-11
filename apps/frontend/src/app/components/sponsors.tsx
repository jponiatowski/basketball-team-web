import { Flex, Grid } from '@radix-ui/themes';
import { getSponsors } from '../actions';
import Image from 'next/image';
import Link from 'next/link';

export const Sponsors = async () => {
  const sponsors = await getSponsors();

  return (
    <section className="bg-gray-950">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-16 px-4 py-8 lg:py-16">
        {sponsors?.strategicSponsors &&
        sponsors.strategicSponsors.length > 0 ? (
          <div>
            <h2 className="mb-8 text-left text-3xl leading-tight font-extrabold tracking-tight text-white md:text-4xl lg:mb-16">
              Sponsorzy sponsorzy strategiczni
            </h2>
            <Flex gap="8" wrap="wrap" justify="center" align="center">
              {sponsors.strategicSponsors?.map((sponsor) => (
                <Link
                  key={sponsor.name}
                  href={sponsor.link.url}
                  target={sponsor.link.target}
                >
                  <figure className="relative h-20 w-auto md:h-[100px]">
                    <Image
                      src={sponsor.image.url}
                      placeholder="blur"
                      blurDataURL={sponsor.image.placeholder}
                      alt={sponsor.name}
                      className="h-20 w-auto object-contain brightness-70 transition-all duration-300 ease-in-out hover:brightness-100 md:h-[100px]"
                      width={0}
                      height={100}
                      sizes="320px"
                    />
                  </figure>
                </Link>
              ))}
            </Flex>
          </div>
        ) : null}
        {sponsors?.titleSponsors && sponsors.titleSponsors.length > 0 ? (
          <div>
            <h2 className="text-text-left mb-8 text-3xl leading-tight font-extrabold tracking-tight text-white md:text-4xl lg:mb-16">
              Sponsorzy tytularni
            </h2>
            <Flex gap="8" wrap="wrap" justify="center" align="center">
              {sponsors.titleSponsors?.map((sponsor) => (
                <Link
                  key={sponsor.name}
                  href={sponsor.link.url}
                  target={sponsor.link.target}
                >
                  <figure className="relative h-auto w-full md:h-[90px] md:w-auto">
                    <Image
                      src={sponsor.image.url}
                      alt={sponsor.name}
                      placeholder="blur"
                      blurDataURL={sponsor.image.placeholder}
                      className="mx-auto h-auto w-full object-contain brightness-70 transition-all duration-300 ease-in-out hover:brightness-100 md:h-[90px] md:w-auto"
                      width={0}
                      height={90}
                      sizes="320px"
                    />
                  </figure>
                </Link>
              ))}
            </Flex>
          </div>
        ) : null}
        {sponsors?.partnerSponsors && sponsors.partnerSponsors.length > 0 ? (
          <div>
            <h2 className="text-text-left mb-8 text-3xl leading-tight font-extrabold tracking-tight text-white md:text-4xl lg:mb-16">
              Partnerzy grup młodzieżowych
            </h2>
            <div className="grid grid-cols-2 items-center justify-center gap-8 md:flex md:flex-wrap">
              {sponsors.partnerSponsors?.map((sponsor) => (
                <Link
                  key={sponsor.name}
                  href={sponsor.link.url}
                  target={sponsor.link.target}
                >
                  <figure className="relative mx-auto h-12 w-fit md:h-16 md:w-auto">
                    <Image
                      src={sponsor.image.url}
                      alt={sponsor.name}
                      placeholder="blur"
                      blurDataURL={sponsor.image.placeholder}
                      className="h-12 w-auto object-contain brightness-70 transition-all duration-300 ease-in-out hover:brightness-100 md:h-16"
                      width={0}
                      height={64}
                      sizes="320px"
                    />
                  </figure>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
