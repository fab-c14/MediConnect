const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const doctorCount = await Doctor.countDocuments({ status: 'active' });
    const userCount = await User.countDocuments({ status: 'active' });
    const totalAppointments = await Appointment.countDocuments();

    // Get upcoming appointments
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingAppointments = await Appointment.countDocuments({
      appointmentDate: { $gte: today },
      status: { $in: ['pending', 'confirmed'] }
    });

    // Get appointments by status
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    const confirmedAppointments = await Appointment.countDocuments({ status: 'confirmed' });
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });
    const cancelledAppointments = await Appointment.countDocuments({ status: 'cancelled' });

    // Get recent appointments
    const recentAppointments = await Appointment.find()
      .populate('doctor', 'name specialization')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get monthly appointment data for charts (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyAppointments = await Appointment.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          doctors: doctorCount,
          patients: userCount,
          totalAppointments,
          upcomingAppointments
        },
        appointmentsByStatus: {
          pending: pendingAppointments,
          confirmed: confirmedAppointments,
          completed: completedAppointments,
          cancelled: cancelledAppointments
        },
        recentAppointments,
        monthlyAppointments
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
