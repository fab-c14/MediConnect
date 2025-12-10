import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  LocalHospital,
  CalendarMonth,
  People,
  BarChart,
  Settings,
  Security,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <LocalHospital sx={{ fontSize: 50, color: 'primary.main' }} />,
      title: 'Doctor Management',
      description: 'Efficiently manage your medical staff with comprehensive profiles, schedules, and performance tracking.',
    },
    {
      icon: <CalendarMonth sx={{ fontSize: 50, color: 'secondary.main' }} />,
      title: 'Appointment System',
      description: 'Streamline appointment bookings with real-time scheduling and automated reminders.',
    },
    {
      icon: <People sx={{ fontSize: 50, color: 'primary.main' }} />,
      title: 'Patient Records',
      description: 'Maintain secure and organized patient information with easy access and comprehensive history.',
    },
    {
      icon: <BarChart sx={{ fontSize: 50, color: 'secondary.main' }} />,
      title: 'Analytics & Reports',
      description: 'Gain insights with detailed analytics, charts, and customizable reports for better decision making.',
    },
    {
      icon: <Settings sx={{ fontSize: 50, color: 'primary.main' }} />,
      title: 'System Settings',
      description: 'Customize your platform with flexible settings and configurations to match your workflow.',
    },
    {
      icon: <Security sx={{ fontSize: 50, color: 'secondary.main' }} />,
      title: 'Backup & Restore',
      description: 'Ensure data security with automated backup systems and easy restoration capabilities.',
    },
  ];

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <LocalHospital sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            MediConnect
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/login')}
            sx={{ borderRadius: 20 }}
          >
            Admin Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #10B981 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Modern Healthcare Management System
              </Typography>
              <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Streamline your clinic operations with our comprehensive admin panel.
                Manage doctors, appointments, patients, and analytics all in one place.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                  px: 4,
                  py: 1.5,
                  borderRadius: 20,
                }}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <LocalHospital sx={{ fontSize: 300, opacity: 0.2 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Powerful Features
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Everything you need to manage your healthcare facility efficiently
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box mb={2}>{feature.icon}</Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={12} md={4}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                500+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Healthcare Facilities
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                50K+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Appointments Managed
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                99.9%
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Uptime Guarantee
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #10B981 0%, #FF6B35 100%)',
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to Transform Your Healthcare Management?
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of healthcare facilities using MediConnect for better patient care
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
              px: 5,
              py: 2,
              borderRadius: 20,
            }}
          >
            Start Now
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', py: 4, borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" mb={2}>
                <LocalHospital sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  MediConnect
                </Typography>
              </Box>
              <Typography color="text.secondary">
                Modern healthcare management system for the digital age.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} textAlign={{ xs: 'left', md: 'right' }}>
              <Typography color="text.secondary">
                © 2024 MediConnect. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
