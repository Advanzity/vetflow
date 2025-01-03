'use client';

import { Card, Flex, Grid } from '@/once-ui/components';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsGrid } from '@/components/dashboard/stats/StatsGrid';
import { RevenueChart } from '@/components/dashboard/charts/RevenueChart';
import { ActivityFeed } from '@/components/dashboard/activity/ActivityFeed';
import { StaffSchedule } from '@/components/dashboard/staff/StaffSchedule';
import { InventoryStatus } from '@/components/dashboard/inventory/InventoryStatus';

export default function DashboardPage() {
    return (
        <Flex direction="column" gap="32">
            <DashboardHeader />
            
            <StatsGrid />

            <Grid
                gap="24"
                style={{
                    gridTemplateColumns: '2fr 1fr',
                }}>
                {/* Main Content - Left Column */}
                <Flex
                    direction="column"
                    gap="24">
                    <RevenueChart />
                    <Grid
                        gap="24"
                        style={{
                            gridTemplateColumns: 'repeat(2, 1fr)',
                        }}>
                        <StaffSchedule />
                        <InventoryStatus />
                    </Grid>
                </Flex>

                {/* Sidebar - Right Column */}
                <Flex
                    direction="column"
                    gap="24">
                    <ActivityFeed />
                </Flex>
            </Grid>
        </Flex>
    );
}