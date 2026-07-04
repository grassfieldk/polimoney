'use client';

import { Anchor, Box, Group, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SNSSharePanel from './SNSSharePanel';

export function Header({ profileName }: { profileName?: string }) {
  const pathname = usePathname();

  return (
    <Box component="header">
      <Group justify="space-between">
        <Anchor component={Link} href="/" underline="never" c="inherit">
          <Title order={1}>Polimoney</Title>
        </Anchor>

        {pathname !== '/' && (
          <Group>
            <Group visibleFrom="lg">
              <Anchor href="#summary" size="sm">
                収支の流れ
              </Anchor>
              <Anchor href="#income" size="sm">
                収入の一覧
              </Anchor>
              <Anchor href="#expense" size="sm">
                支出の一覧
              </Anchor>
            </Group>
            <SNSSharePanel profileName={profileName ?? ''} />
          </Group>
        )}
      </Group>
      <Text size="xs" c="dimmed" ta="center" mt="md">
        政治資金の流れを見える化するプラットフォームです。透明性の高い政治実現を目指して、オープンソースで開発されています。
      </Text>
    </Box>
  );
}
