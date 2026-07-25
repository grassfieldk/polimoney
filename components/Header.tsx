'use client';

import {
  Anchor,
  Box,
  Group,
  Switch,
  Text,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { MoonIcon, SunIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SNSSharePanel from './SNSSharePanel';

export function Header({ profileName }: { profileName?: string }) {
  const pathname = usePathname();
  const { toggleColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box component="header">
      <Group justify="space-between">
        <Anchor component={Link} href="/" underline="never" c="inherit">
          <Title order={1}>Polimoney</Title>
        </Anchor>

        <Group>
          {pathname !== '/' && (
            <>
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
            </>
          )}
          <Switch
            size="md"
            checked={mounted && computedColorScheme === 'dark'}
            onChange={() => toggleColorScheme()}
            onLabel={<MoonIcon size={14} />}
            offLabel={<SunIcon size={14} />}
            aria-label="テーマ切り替え"
          />
        </Group>
      </Group>
      <Text size="xs" c="dimmed" ta="center" mt="md">
        政治資金の流れを見える化するプラットフォームです。透明性の高い政治実現を目指して、オープンソースで開発されています。
      </Text>
    </Box>
  );
}
