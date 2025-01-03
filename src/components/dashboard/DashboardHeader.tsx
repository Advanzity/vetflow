import { Button, Flex, Input, IconButton } from '@/once-ui/components';

export const DashboardHeader = () => {
    return (
        <Flex 
            fillWidth
            justifyContent="space-between"
            alignItems="center"
            gap="16"
            marginBottom="32">
            <Flex gap="16" alignItems="center">
                <Input
                    id="search"
                    label="Search patients, appointments..."
                    labelAsPlaceholder
                    prefixIcon="search"
                    style={{ backgroundColor: 'transparent' }}
                />
                <IconButton
                    icon="filter"
                    variant="secondary"
                    tooltip="Filter"
                />
            </Flex>
            <Flex gap="8">
                <Button
                    variant="secondary"
                    label="New Patient"
                    prefixIcon="userPlus"
                />
                <Button
                    variant="primary"
                    label="New Appointment"
                    prefixIcon="calendar"
                />
            </Flex>
        </Flex>
    );
};