import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  current?: boolean;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  ariaLabel?: string;

  className?: string;
};

export const Breadcrumbs = ({
  items,
  ariaLabel = 'Breadcrumb',
  className = 'flex',
}: BreadcrumbsProps) => {
  if (!items?.length) return null;

  return (
    <nav className={className} aria-label={ariaLabel}>
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1 || item.current;
          return (
            <li
              key={`${item.label}-${idx}`}
              className="inline-flex items-center"
              aria-current={isLast ? 'page' : undefined}
            >
              {idx > 0 && (
                <div className="mx-0.5 flex items-center md:mx-0">
                  <ChevronRight width={16} height={16} />
                </div>
              )}

              {isLast || !item.href ? (
                <span className="ms-1 inline-flex items-center text-sm font-medium text-gray-500 md:ms-2">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="hover:text-primary-600 ms-1 inline-flex items-center text-sm font-medium text-gray-700 md:ms-2"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
