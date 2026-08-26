import type { PoliticianMasterEntry } from '@/data/politician-master';
import { LinkCard } from './LinkCard';

type Props = {
  entry: PoliticianMasterEntry;
};

export function PoliticianCard({ entry }: Props) {
  const badges = [
    entry.profile.party && { label: entry.profile.party },
    entry.profile.district && { label: entry.profile.district, color: 'gray' },
  ].filter((v): v is { label: string; color?: string } => Boolean(v));

  return (
    <LinkCard
      href={`/politicians/${entry.id}`}
      image={{ src: entry.profile.image, alt: entry.profile.name }}
      overline={entry.profile.title}
      title={entry.profile.name}
      badges={badges}
    />
  );
}
