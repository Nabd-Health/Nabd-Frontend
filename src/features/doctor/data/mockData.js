/**
 * Mock Data for Doctor Dashboard
 * Used for testing and development purposes
 */

// Helper to get dates relative to today
const getRelativeDate = (daysOffset) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toISOString().split('T')[0];
};

const today = getRelativeDate(0);
const yesterday = getRelativeDate(-1);
const tomorrow = getRelativeDate(1);
const lastWeek = getRelativeDate(-7);
const nextWeek = getRelativeDate(7);

// Mock Patients
export const mockPatients = [
    {
        id: 'p1',
        fullName: 'أحمد محمد علي',
        phoneNumber: '01012345678',
        gender: 'Male',
        age: 35,
        profileImageUrl: null,
        totalSessions: 5,
        lastVisitDate: lastWeek,
        address: 'المعادي، القاهرة',
        rating: 4.8,
        bloodType: 'A+',
        chronicDiseases: ['Diabetes'],
        notes: 'Patient prefers morning appointments.'
    },
    {
        id: 'p2',
        fullName: 'سارة أحمد محمود',
        phoneNumber: '01123456789',
        gender: 'Female',
        age: 28,
        profileImageUrl: null,
        totalSessions: 3,
        lastVisitDate: yesterday,
        address: 'مدينة نصر، القاهرة',
        rating: 5.0,
        bloodType: 'O+',
        chronicDiseases: [],
        notes: 'Allergic to Penicillin.'
    },
    {
        id: 'p3',
        fullName: 'محمود حسن إبراهيم',
        phoneNumber: '01234567890',
        gender: 'Male',
        age: 45,
        profileImageUrl: null,
        totalSessions: 8,
        lastVisitDate: '2025-09-15',
        address: 'المهندسين، الجيزة',
        rating: 4.5,
        bloodType: 'B-',
        chronicDiseases: ['Hypertension'],
        notes: ''
    },
    {
        id: 'p4',
        fullName: 'منى السيد علي',
        phoneNumber: '01555555555',
        gender: 'Female',
        age: 52,
        profileImageUrl: null,
        totalSessions: 12,
        lastVisitDate: '2025-10-01',
        address: 'مصر الجديدة، القاهرة',
        rating: 4.9,
        bloodType: 'AB+',
        chronicDiseases: ['Asthma'],
        notes: ''
    },
    {
        id: 'p5',
        fullName: 'خالد عبد الرحمن',
        phoneNumber: '01099887766',
        gender: 'Male',
        age: 60,
        profileImageUrl: null,
        totalSessions: 1,
        lastVisitDate: today,
        address: 'التجمع الخامس، القاهرة',
        rating: 4.0,
        bloodType: 'A-',
        chronicDiseases: ['Heart Disease'],
        notes: 'Requires wheelchair access.'
    }
];

// Mock Appointments
export const mockAppointments = [
    // Today's Appointments
    {
        id: 'apt1',
        patientId: 'p1',
        patientName: 'أحمد محمد علي',
        patientPhoneNumber: '01012345678',
        appointmentDate: today,
        appointmentTime: '09:00:00',
        duration: 30,
        appointmentType: 'regular', // 'regular' or 'followup'
        status: 1, // Confirmed
        price: 300,
        notes: 'Regular checkup',
        bookingDate: yesterday
    },
    {
        id: 'apt2',
        patientId: 'p2',
        patientName: 'سارة أحمد محمود',
        patientPhoneNumber: '01123456789',
        appointmentDate: today,
        appointmentTime: '10:30:00',
        duration: 20,
        appointmentType: 'followup',
        status: 2, // CheckedIn
        price: 150,
        notes: 'Follow up on test results',
        bookingDate: lastWeek
    },
    {
        id: 'apt3',
        patientId: 'p5',
        patientName: 'خالد عبد الرحمن',
        patientPhoneNumber: '01099887766',
        appointmentDate: today,
        appointmentTime: '12:00:00',
        duration: 45,
        appointmentType: 'regular',
        status: 0, // Pending
        price: 300,
        notes: 'First visit',
        bookingDate: today
    },
    {
        id: 'apt4',
        patientId: 'p3',
        patientName: 'محمود حسن إبراهيم',
        patientPhoneNumber: '01234567890',
        appointmentDate: today,
        appointmentTime: '14:00:00',
        duration: 30,
        appointmentType: 'regular',
        status: 3, // InProgress
        price: 300,
        notes: 'Currently in session',
        bookingDate: yesterday
    },

    // Past Appointments
    {
        id: 'apt5',
        patientId: 'p4',
        patientName: 'منى السيد علي',
        patientPhoneNumber: '01555555555',
        appointmentDate: yesterday,
        appointmentTime: '11:00:00',
        duration: 30,
        appointmentType: 'regular',
        status: 4, // Completed
        price: 300,
        notes: 'Completed successfully',
        bookingDate: lastWeek
    },
    {
        id: 'apt6',
        patientId: 'p1',
        patientName: 'أحمد محمد علي',
        patientPhoneNumber: '01012345678',
        appointmentDate: lastWeek,
        appointmentTime: '15:00:00',
        duration: 20,
        appointmentType: 'followup',
        status: 4, // Completed
        price: 150,
        notes: 'Previous follow up',
        bookingDate: getRelativeDate(-10)
    },
    {
        id: 'apt7',
        patientId: 'p2',
        patientName: 'سارة أحمد محمود',
        patientPhoneNumber: '01123456789',
        appointmentDate: getRelativeDate(-3),
        appointmentTime: '13:00:00',
        duration: 30,
        appointmentType: 'regular',
        status: 6, // Cancelled
        price: 300,
        notes: 'Patient cancelled',
        bookingDate: getRelativeDate(-5)
    },

    // Future Appointments
    {
        id: 'apt8',
        patientId: 'p3',
        patientName: 'محمود حسن إبراهيم',
        patientPhoneNumber: '01234567890',
        appointmentDate: tomorrow,
        appointmentTime: '09:30:00',
        duration: 30,
        appointmentType: 'regular',
        status: 1, // Confirmed
        price: 300,
        notes: 'Upcoming appointment',
        bookingDate: today
    },
    {
        id: 'apt9',
        patientId: 'p4',
        patientName: 'منى السيد علي',
        patientPhoneNumber: '01555555555',
        appointmentDate: nextWeek,
        appointmentTime: '10:00:00',
        duration: 30,
        appointmentType: 'followup',
        status: 0, // Pending
        price: 150,
        notes: 'Routine check',
        bookingDate: today
    }
];

// Mock Statistics
export const mockStatistics = {
    total: mockAppointments.length,
    pending: mockAppointments.filter(a => a.status === 0).length,
    confirmed: mockAppointments.filter(a => a.status === 1).length,
    checkedIn: mockAppointments.filter(a => a.status === 2).length,
    inProgress: mockAppointments.filter(a => a.status === 3).length,
    completed: mockAppointments.filter(a => a.status === 4).length,
    noShow: mockAppointments.filter(a => a.status === 5).length,
    cancelled: mockAppointments.filter(a => a.status === 6).length,
    todayTotal: mockAppointments.filter(a => a.appointmentDate === today).length,
    todayPending: mockAppointments.filter(a => a.appointmentDate === today && a.status === 0).length,
    todayConfirmed: mockAppointments.filter(a => a.appointmentDate === today && a.status === 1).length,
    todayCompleted: mockAppointments.filter(a => a.appointmentDate === today && a.status === 4).length,
};

// Mock Dashboard Stats (for useDashboardStats)
export const mockDashboardStats = {
    totalPatients: mockPatients.length,
    todayAppointments: mockAppointments.filter(a => a.appointmentDate === today).length,
    averageRating: 4.8,
    monthlyRevenue: 15000
};

// Helper to simulate API delay
export const simulateApiDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));
