import { Box, SimpleGrid } from '@chakra-ui/react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Notice } from '@/components/Notice';
import { PoliticianCard } from '@/components/PoliticianCard';
import { comingSoonId, politicianMaster } from '@/data/politician-master';

export const metadata = {
  title: 'Polimoney - 政治資金の透明性を高める',
  description:
    'Polimoneyは、デジタル民主主義2030プロジェクトの一環として、政治資金の透明性を高めるために開発されたオープンソースのプロジェクトです。',
};

const TOP_COUNT = 9;

export default function Page() {
  const topPoliticians = politicianMaster
    .filter((e) => !e.id.startsWith(comingSoonId))
    .slice(0, TOP_COUNT);

  return (
    <Box>
      <Header />
      <Box px={4} py={6}>
        {/* TODO: セクションが増えるまで「政治家」見出しは非表示 */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={3} mb={4}>
          {topPoliticians.map((entry) => (
            <PoliticianCard key={entry.id} entry={entry} />
          ))}
        </SimpleGrid>
        {/* TODO: データが増えた場合「政治家一覧をもっと見る」ボタンと表示上限を設ける */}
        {/* TODO: 政治団体導線を再公開する際に政治団体セクション（一覧カード＋もっと見る）を復帰する */}
      </Box>
      <Notice />
      <Footer />
    </Box>
  );
}
