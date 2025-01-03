import { Grid } from '@/once-ui/components';
import { ChartCard } from './ChartCard/ChartCard';
import { generateChartData } from './utils/chartData';
import styles from './ChartGrid.module.scss';

export const ChartGrid = () => {
    return (
        <Grid className={styles.grid}>
            <ChartCard
                title="Total Revenue"
                value="$12,345"
                trendPercentage={12.5}
                data={generateChartData()}
                chartType="area"
            />
            <ChartCard
                title="Active Patients"
                value="1,234"
                trendPercentage={8.2}
                data={generateChartData()}
                chartType="line"
            />
            <ChartCard
                title="Conversion Rate"
                value="2.4%"
                trendPercentage={-3.1}
                data={generateChartData()}
                chartType="bar"
            />
        </Grid>
    );
};