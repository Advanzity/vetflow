'use client';

import { useParams } from 'next/navigation';
import { Flex, Grid } from '@/once-ui/components';
import { ActivityFeed } from '@/components/dashboard/activity/ActivityFeed';
import { RevenueChart } from '@/components/dashboard/charts/RevenueChart';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StaffSchedule } from '@/components/dashboard/staff/StaffSchedule';
import { StatsGrid } from '@/components/dashboard/stats/StatsGrid';

export default function ClinicDashboardPage() {
    const { id } = useParams();

    // Placeholder: Fetch data dynamically based on `id`
    const clinicName = id === '1' ? 'Happy Paws Veterinary Clinic' : 'Unknown Clinic';

    return (
        <Flex direction="column" gap="32">
            <h1>{clinicName}</h1>
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
                        {/* <InventoryStatus /> */}
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
