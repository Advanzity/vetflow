export interface Appointment {
    id: string;
    patientName: string;
    ownerName: string;
    date: Date;
    type: 'checkup' | 'surgery' | 'vaccination' | 'emergency';
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

export interface PatientStats {
    totalPatients: number;
    upcomingAppointments: number;
    pendingLabResults: number;
    trend: number;
}

export interface RevenueData {
    amount: number;
    date: Date;
}

export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    reorderPoint: number;
    status: 'ok' | 'low' | 'critical';
}

export interface StaffMember {
    id: string;
    name: string;
    role: string;
    status: 'available' | 'busy' | 'off';
    nextAvailable?: Date;
}

export interface Activity {
    id: string;
    type: 'appointment' | 'lab_result' | 'prescription' | 'emergency';
    description: string;
    timestamp: Date;
    priority: 'low' | 'medium' | 'high';
}

export interface EmergencyCase {
    id: string;
    patient: string;
    type: string;
    status: 'critical' | 'urgent' | 'stable';
    timeElapsed: string;
}

export function getAppointments(): Appointment[] {
    return [
        {
            id: '1',
            patientName: 'Max',
            ownerName: 'John Smith',
            date: new Date(),
            type: 'checkup',
            status: 'scheduled'
        },
        // Add more mock appointments
    ];
}

export function getPatientStats(): PatientStats {
    return {
        totalPatients: 1234,
        upcomingAppointments: 48,
        pendingLabResults: 15,
        trend: 12
    };
}

export function getRevenueData(): RevenueData[] {
    return Array.from({ length: 12 }, (_, i) => ({
        amount: Math.floor(Math.random() * 10000) + 5000,
        date: new Date(2024, i, 1)
    }));
}

export function getInventoryStatus(): InventoryItem[] {
    return [
        {
            id: '1',
            name: 'Vaccines & Immunizations',
            quantity: 45,
            reorderPoint: 20,
            status: 'ok'
        },
        {
            id: '2',
            name: 'Antibiotics',
            quantity: 15,
            reorderPoint: 25,
            status: 'low'
        },
        {
            id: '3',
            name: 'Surgical Supplies',
            quantity: 5,
            reorderPoint: 30,
            status: 'critical'
        },
        {
            id: '4',
            name: 'Diagnostic Tests',
            quantity: 75,
            reorderPoint: 40,
            status: 'ok'
        }
    ];
}

export function getStaffSchedule(): StaffMember[] {
    return [
        {
            id: '1',
            name: 'Dr. Sarah Johnson',
            role: 'Veterinarian',
            status: 'available'
        },
        {
            id: '2',
            name: 'Dr. Michael Chen',
            role: 'Veterinary Surgeon',
            status: 'busy'
        },
        {
            id: '3',
            name: 'Emma Davis',
            role: 'Veterinary Nurse',
            status: 'available'
        },
        {
            id: '4',
            name: 'Dr. James Wilson',
            role: 'Veterinarian',
            status: 'off'
        }
    ];
}

export function getRecentActivity(): Activity[] {
    return [
        {
            id: '1',
            type: 'appointment',
            description: 'New appointment scheduled for Max',
            timestamp: new Date(),
            priority: 'low'
        },
        // Add more mock activities
    ];
}

export function getEmergencyCases(): EmergencyCase[] {
    return [
        {
            id: '1',
            patient: 'Luna (Golden Retriever)',
            type: 'Trauma',
            status: 'critical',
            timeElapsed: '5 min ago'
        },
        {
            id: '2',
            patient: 'Oliver (Persian Cat)',
            type: 'Respiratory',
            status: 'urgent',
            timeElapsed: '15 min ago'
        },
        {
            id: '3',
            patient: 'Rocky (German Shepherd)',
            type: 'Poisoning',
            status: 'stable',
            timeElapsed: '30 min ago'
        }
    ];
}