import { type HTMLAttributes } from 'react';
import { cn } from '~/lib/utils';
import { typographyVariants } from './ui/typography';

type AboutProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function About({ className, ...props }: AboutProps): JSX.Element {
  return (
    <section className={cn(className, 'w-full')} {...props}>
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-10 px-5 py-10">
        <h2 className={cn(typographyVariants({ variant: 'h2' }))}>
          Musik og kultur i lokalområdet
        </h2>
        <p className={cn(typographyVariants())}>
          Åkanderne er en nystartet kulturforening beliggende i Hørning. Vi er
          drevet af en lille frivillig gruppe dog med lønnede undervisere i
          musik og drama. Vi holder til i Friskolen Åskolen og efterskolen
          Ådalen’s lokaler på Brogaardsvej.
        </p>
        <p className={cn(typographyVariants())}>
          Fælles for os alle er at vi ønsker at styrke det kulturelle fællesskab
          i Hørning og omegn gennem kurser af forskellig varighed og events for
          både børn og voksne.
        </p>
        <p className={cn(typographyVariants())}>
          Vores idérigdom er stor, og jo flere der ønsker at støtte foreningen,
          enten som medlem eller som frivillig, jo flere tiltag kan vi sætte i
          søen.
        </p>
        <p className={cn(typographyVariants(), 'font-semibold')}>
          Hold øje med hjemmesiden eller meld dig ind som passivt medlem til 200
          kr årligt i formularen nederst for at støtte foreningen og være den
          første til at modtage fremtidige tilbud.
        </p>
      </div>
    </section>
  );
}
