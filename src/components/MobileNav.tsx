import { useEffect, useState } from 'react';

/** `href` is already resolved against the base path; `active` marks the current section. */
type NavItem = { label: string; href: string; active: boolean };

interface Props {
  items: NavItem[];
  cta: { label: string; href: string; external: boolean } | null;
}

export default function MobileNav({ items, cta }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <div className='lg:hidden'>
      <button
        type='button'
        aria-expanded={open}
        aria-controls='mobile-menu'
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        onClick={() => setOpen((o) => !o)}
        className='relative z-50 grid size-11 place-items-center rounded-full text-plum-700 transition hover:bg-plum-100'
      >
        <svg
          viewBox='0 0 24 24'
          className='size-6'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          strokeLinecap='round'
          aria-hidden='true'
        >
          {open ? <path d='M6 6l12 12M18 6 6 18' /> : <path d='M4 7h16M4 12h16M4 17h16' />}
        </svg>
      </button>

      <div
        id='mobile-menu'
        hidden={!open}
        className='fixed inset-x-0 top-0 z-40 h-dvh overflow-y-auto bg-mist px-4 pt-24 pb-10'
      >
        <nav aria-label='Navigation principale'>
          <ul className='flex flex-col gap-1'>
            {items.map((item) => {
              const active = item.active;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`block rounded-2xl px-4 py-3 text-xl font-semibold transition ${
                      active ? 'bg-plum-600 text-white' : 'text-plum-800 hover:bg-plum-100'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        {cta && (
          <a
            href={cta.href}
            target={cta.external ? '_blank' : undefined}
            rel={cta.external ? 'noopener noreferrer' : undefined}
            onClick={() => setOpen(false)}
            className='mt-8 flex items-center justify-center rounded-full bg-plum-600 px-5 py-4 font-semibold text-white'
          >
            {cta.label}
          </a>
        )}
      </div>
    </div>
  );
}
