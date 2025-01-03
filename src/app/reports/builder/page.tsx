
import { Grid, Flex } from '@/once-ui/components';
import { QueryBuilder } from '@/components/reports/builder/QueryBuilder';
import { OutputConfig } from '@/components/reports/builder/OutputConfig';
import { ReportLayout } from '@/components/reports/builder/ReportLayout';
import ReportBuilder from '@/components/reports/builder/ReportBuilder';

export default function ReportBuilderPage() {
    return (
        <Flex direction="column" gap="24">
            <Grid
                gap="24"
                style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                }}>
                              <ReportBuilder />

                <OutputConfig />
                <ReportLayout />
            </Grid>
        </Flex>
    );
}