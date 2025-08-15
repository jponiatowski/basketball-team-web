import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-primary-600 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Ups! Strona nie została znaleziona
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Wygląda na to, że podany adres jest nieprawidłowy lub strona została
            przeniesiona. Wróć na stronę główną.
          </p>
          <Button asChild variant="solid" size="3">
            <Link href="/">Wróć do strony głównej</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
