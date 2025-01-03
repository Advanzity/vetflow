'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Button, Card, Text, ToggleButton, Grid } from '@/once-ui/components';

interface Clinic {
    id: string;
    name: string;
    address: string;
}

const mockOwnedClinics: Clinic[] = [
    { id: '1', name: 'Happy Paws Veterinary Clinic', address: '123 Main St' },
    { id: '2', name: 'Healthy Tails Vet', address: '456 Elm St' },
];

const mockAccessibleClinics: Clinic[] = [
    { id: '3', name: 'Companion Care', address: '789 Oak St' },
];

const ClinicCard = ({ clinic }: { clinic: Clinic }) => {
    const router = useRouter();

    return (
        <Card
            onClick={() => router.push(`dashboard/clinic/${clinic.id}`)}
        >
            <Text variant="heading-strong-s">{clinic.name}</Text>
            <Text variant="body-default-xs" onBackground="neutral-medium">
                {clinic.address}
            </Text>
        </Card>
    );
};

export default function ClinicPage() {
    const [showOwned, setShowOwned] = useState(true);

    const clinics = showOwned ? mockOwnedClinics : mockAccessibleClinics;

    return (
        <Flex direction="column" gap="16" padding="24">
            <Flex justifyContent="center" gap="8">
                <ToggleButton
                    selected={showOwned}
                    onClick={() => setShowOwned(true)}
                    label="Owned Clinics"
                />
                <ToggleButton
                    selected={!showOwned}
                    onClick={() => setShowOwned(false)}
                    label="Accessible Clinics"
                />
            </Flex>

            <Grid gap="16" tabletColumns="2col" mobileColumns="1col">
                {clinics.map((clinic) => (
                    <ClinicCard key={clinic.id} clinic={clinic} />
                ))}
            </Grid>
        </Flex>
    );
}
