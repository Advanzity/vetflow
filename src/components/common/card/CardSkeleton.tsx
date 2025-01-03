'use client';

import { Flex, Skeleton } from '@/once-ui/components';

export const CardSkeleton = () => {
    return (
        <Flex
            fillWidth
            direction="column"
            gap="16"
            padding="16">
            <Skeleton shape="line" width="l" height="s" />
            <Skeleton shape="line" width="m" height="s" />
            <Skeleton shape="line" width="xl" height="s" />
        </Flex>
    );
};