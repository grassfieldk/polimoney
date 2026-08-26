import { Avatar, Badge, Group, Stack, Text, Title } from '@mantine/core';
import type { ProfileList } from '@/models/type';

export function ProfileHeader({ profile }: { profile: ProfileList }) {
  const badges = [
    profile.party && { label: profile.party },
    profile.district && { label: profile.district, color: 'gray' },
  ].filter((v): v is { label: string; color?: string } => Boolean(v));

  return (
    <Group wrap="nowrap">
      <Avatar src={profile.image} alt={profile.name} size="xl" />
      <Stack gap={0}>
        {profile.title && (
          <Text size="xs" c="dimmed">
            {profile.title}
          </Text>
        )}
        <Title order={2}>{profile.name}</Title>
        {badges.length > 0 && (
          <Group gap="xs" mt={4}>
            {badges.map((badge) => (
                <Badge
                  key={badge.label}
                  variant="filled"
                  color={badge.color}
                >
                  {badge.label}
                </Badge>
            ))}
          </Group>
        )}
      </Stack>
    </Group>
  );
}
