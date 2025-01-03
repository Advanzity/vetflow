import { Grid } from '@/once-ui/components';
import { StatCard } from '@/components/dashboard/cards/StatCard';
import { getPatientStats } from '@/lib/mock/dashboard';

export const StatsGrid = () => {
    const stats = [
        { 
            title: 'Total Patients',
            value: '1,234',
            trend: '12',
            icon: 'users',
            color: 'brand',
            data: Array.from({ length: 12 }, () => ({ 
                value: Math.floor(Math.random() * 100) 
            }))
        },
        { 
            title: 'Active Appointments',
            value: '48',
            trend: '5',
            icon: 'calendar',
            color: 'accent',
            data: Array.from({ length: 12 }, () => ({ 
                value: Math.floor(Math.random() * 100) 
            }))
        },
        { 
            title: 'Monthly Revenue',
            value: '$12,345',
            trend: '8',
            icon: 'dollarSign',
            color: 'success',
            data: Array.from({ length: 12 }, () => ({ 
                value: Math.floor(Math.random() * 100) 
            }))
        },
        { 
            title: 'New Clients',
            value: '28',
            trend: '-3',
            icon: 'userPlus',
            color: 'warning',
            data: Array.from({ length: 12 }, () => ({ 
                value: Math.floor(Math.random() * 100) 
            }))
        }
    ];

    return (
        <Grid
            gap="24"
            style={{
                gridTemplateColumns: 'repeat(4, 1fr)',
                width: '100%'
            }}
            tabletColumns="2col"
            mobileColumns="1col">
            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    {...stat}
                />
            ))}
        </Grid>
    );
};