import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
} from '@mui/material';
import {
  People,
  LocalHospital,
  CalendarMonth,
  TrendingUp,
} from '@mui/icons-material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getDashboardStats } from '../../services/apiService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    counts: {
      doctors: 0,
      patients: 0,
      totalAppointments: 0,
      upcomingAppointments: 0,
    },
    appointmentsByStatus: {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    },
    recentAppointments: [],
    monthlyAppointments: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Doctors',
      value: stats.counts.doctors,
      icon: <LocalHospital sx={{ fontSize: 40 }} />,
      color: '#FF6B35',
      bgColor: '#FFF0EB',
    },
    {
      title: 'Total Patients',
      value: stats.counts.patients,
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#10B981',
      bgColor: '#ECFDF5',
    },
    {
      title: 'Total Appointments',
      value: stats.counts.totalAppointments,
      icon: <CalendarMonth sx={{ fontSize: 40 }} />,
      color: '#3B82F6',
      bgColor: '#EFF6FF',
    },
    {
      title: 'Upcoming Appointments',
      value: stats.counts.upcomingAppointments,
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#F59E0B',
      bgColor: '#FFFBEB',
    },
  ];

  const appointmentStatusData = {
    labels: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    datasets: [
      {
        label: 'Appointments by Status',
        data: [
          stats.appointmentsByStatus.pending,
          stats.appointmentsByStatus.confirmed,
          stats.appointmentsByStatus.completed,
          stats.appointmentsByStatus.cancelled,
        ],
        backgroundColor: ['#F59E0B', '#10B981', '#3B82F6', '#EF4444'],
        borderWidth: 0,
      },
    ],
  };

  const monthlyData = {
    labels: stats.monthlyAppointments.map(
      (item) => `${item._id.month}/${item._id.year}`
    ),
    datasets: [
      {
        label: 'Monthly Appointments',
        data: stats.monthlyAppointments.map((item) => item.count),
        borderColor: '#FF6B35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        tension: 0.4,
      },
    ],
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Dashboard Overview
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={3} mb={4}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                background: card.bgColor,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      {card.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: card.color, mt: 1 }}>
                      {card.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: card.color }}>{card.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Appointments Trend
            </Typography>
            <Line data={monthlyData} options={{ responsive: true, maintainAspectRatio: true }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Appointment Status
            </Typography>
            <Doughnut data={appointmentStatusData} options={{ responsive: true }} />
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Appointments */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Recent Appointments
        </Typography>
        {stats.recentAppointments.length > 0 ? (
          <Box>
            {stats.recentAppointments.map((appointment) => (
              <Box
                key={appointment._id}
                sx={{
                  p: 2,
                  mb: 1,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {appointment.patientName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dr. {appointment.doctor?.name} - {appointment.doctor?.specialization}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="body2">
                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor:
                        appointment.status === 'pending'
                          ? '#FFF0EB'
                          : appointment.status === 'confirmed'
                          ? '#ECFDF5'
                          : appointment.status === 'completed'
                          ? '#EFF6FF'
                          : '#FEE2E2',
                      color:
                        appointment.status === 'pending'
                          ? '#F59E0B'
                          : appointment.status === 'confirmed'
                          ? '#10B981'
                          : appointment.status === 'completed'
                          ? '#3B82F6'
                          : '#EF4444',
                      fontWeight: 600,
                    }}
                  >
                    {appointment.status}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography color="text.secondary">No recent appointments</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
