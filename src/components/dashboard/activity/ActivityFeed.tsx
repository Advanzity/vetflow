import { Flex, Text, Icon, Card } from '@/once-ui/components';
import { getRecentActivity } from '@/lib/mock/dashboard';

const ActivityItem = ({ type, description, timestamp, priority }: {
    type: string;
    description: string;
    timestamp: Date;
    priority: string;
}) => (
    <Flex gap="16" padding="16">
        <Icon
            name={type === 'appointment' ? 'calendar' : 
                 type === 'lab_result' ? 'fileText' : 
                 type === 'prescription' ? 'clipboard' : 'alertCircle'}
            size="m"
            onBackground={priority === 'high' ? 'danger-medium' : 
                         priority === 'medium' ? 'warning-medium' : 'success-medium'}
        />
        <Flex direction="column" gap="4">
            <Text variant="body-strong-s">
                {description}
            </Text>
            <Text 
                variant="body-default-xs"
                onBackground="neutral-medium">
                {timestamp.toLocaleTimeString()}
            </Text>
        </Flex>
    </Flex>
);

export const ActivityFeed = () => {
    const activities = getRecentActivity();

    return (
        <Card>
            <Flex direction="column">
                <Flex 
                    padding="16"
                    justifyContent="space-between"
                    alignItems="center">
                    <Text variant="heading-strong-m">
                        Recent Activity
                    </Text>
                    <Text 
                        variant="body-default-s"
                        onBackground="brand-medium">
                        View all
                    </Text>
                </Flex>
                <Flex direction="column">
                    {activities.map((activity) => (
                        <ActivityItem
                            key={activity.id}
                            {...activity}
                        />
                    ))}
                </Flex>
            </Flex>
        </Card>
    );
};