'use client';

import {
  Button,
  Box,
  Flex,
  Group,
  NativeSelect,
  SimpleGrid,
  Tooltip,
} from '@mantine/core';
import html2canvas from 'html2canvas';
import { CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { BoardChart } from '@/components/BoardChart';
import { BoardContainer } from '@/components/BoardContainer';
import { ProfileHeader } from '@/components/ProfileHeader';
import { SectionHeading } from '@/components/SectionHeading';
import { StatCard } from '@/components/StatCard';
import type { Category } from '@/data/common';
import type { Profile, Report, Transaction } from '@/models/type';
import { generateFlowsFromTransactions } from '@/utils/flowGenerator';

type Props = {
  profile: Profile;
  report: Report;
  otherReports: Report[];
  transactions: Transaction[];
  categories?: {
    income: Category[];
    expense: Category[];
  };
  reportPathPrefix: string;
};

export function BoardSummary({
  profile,
  report,
  otherReports,
  transactions,
  categories,
  reportPathPrefix,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [copying, setCopying] = useState(false);
  const flows = categories
    ? generateFlowsFromTransactions(transactions, categories)
    : [];

  const allReports = [
    report,
    ...otherReports.filter((r) => r.id !== report.id),
  ];
  const sortedReports = [...allReports].sort((a, b) => b.year - a.year);

  const handleCopyImage = async () => {
    const element = document.getElementById('summary-content');
    if (!element || copying) return;
    const captureWidth = 960;
    const previousWidth = element.style.width;
    const previousMinWidth = element.style.minWidth;
    setCopying(true);
    element.style.width = `${captureWidth}px`;
    element.style.minWidth = `${captureWidth}px`;

    try {
      const canvas = await html2canvas(element, {
        width: captureWidth,
        windowWidth: captureWidth,
        scale: 1,
      });
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/png');
      });
      if (!blob) throw new Error('画像の生成に失敗しました');
      await navigator.clipboard.write([
        new window.ClipboardItem({ 'image/png': blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (_e) {
      alert('コピーに失敗しました');
    } finally {
      element.style.width = previousWidth;
      element.style.minWidth = previousMinWidth;
      setCopying(false);
    }
  };

  return (
    <BoardContainer id="summary">
      <Box id="summary-content">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          gap="md"
          mb="xl"
        >
          <ProfileHeader profile={profile} />
          <NativeSelect
            w={300}
            value={report.id}
            onChange={(e) => {
              window.location.href = `${reportPathPrefix}/${e.currentTarget.value}`;
            }}
            data={sortedReports.map((r) => ({
              value: r.id,
              label: `${r.year}年 ${r.orgName}`,
            }))}
          />
        </Flex>

        <SectionHeading>収支の流れ</SectionHeading>
        <SimpleGrid cols={{ base: 1, lg: 3 }} mb="md">
          <StatCard
            label="収入総額"
            value={Math.round(report.totalIncome / 10000)}
            tone="income"
          />
          <StatCard
            label="支出総額"
            value={Math.round(report.totalExpense / 10000)}
            tone="expense"
          />
          <StatCard
            label="年間収支"
            value={Math.round(report.totalBalance / 10000)}
          />
        </SimpleGrid>

        <BoardChart flows={flows} />
      </Box>

      <Group justify="flex-end" mt="sm">
        <Tooltip label="コピーしました" opened={copied} withArrow>
          <Button
            id="copy-image-btn"
            variant="default"
            leftSection={<CopyIcon size={16} />}
            onClick={handleCopyImage}
            disabled={copying}
          >
            画像としてコピー
          </Button>
        </Tooltip>
      </Group>
    </BoardContainer>
  );
}
