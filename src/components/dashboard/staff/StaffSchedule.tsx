import { Avatar, Flex, Text, Tag, Card } from '@/once-ui/components';
import { getStaffSchedule } from '@/lib/mock/dashboard';
import { StaffMember } from '@/lib/mock/dashboard';
import { StaffStatusBadge } from './StaffStatusBadge';

const StaffRow = ({ member }: { member: StaffMember }) => (
    <Flex
        fillWidth
        justifyContent="space-between"
        alignItems="center"
        padding="16"
        gap="16"
        background="surface"
        radius="m"
        border="neutral-medium"
        borderStyle="solid-1">
        <Flex gap="12" alignItems="center">
            <Avatar
                size="m"
                value={member.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
            />
            <Flex direction="column" gap="4">
                <Text variant="body-strong-s">
                    {member.name}
                </Text>
                <Text
                    variant="body-default-xs"
                    onBackground="neutral-medium">
                    {member.role}
                </Text>
            </Flex>
        </Flex>
        <StaffStatusBadge status={member.status} />
    </Flex>
);

export const StaffSchedule = () => {
    const staff = getStaffSchedule();

    return (
        <Card>
            <Flex direction="column" gap="16" padding="24">
                <Flex
                    fillWidth
                    justifyContent="space-between"
                    alignItems="center">
                    <Text variant="heading-strong-m">
                        Staff Schedule
                    </Text>
                    <Tag
                        variant="success"
                        label={`${staff.filter(s => s.status === 'available').length} Available`}
                    />
                </Flex>

                <Flex direction="column" gap="8">
                    {staff.map((member) => (
                        <StaffRow
                            key={member.id}
                            member={member}
                        />
                    ))}
                </Flex>
            </Flex>
        </Card>
    );
};