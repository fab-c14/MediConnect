import api from './api';

// Auth endpoints
export const login = (credentials) => api.post('/auth/login', credentials);
export const setupAdmin = (data) => api.post('/auth/setup', data);
export const getMe = () => api.get('/auth/me');

// Dashboard endpoints
export const getDashboardStats = () => api.get('/dashboard/stats');

// Doctor endpoints
export const getDoctors = () => api.get('/doctors');
export const getDoctor = (id) => api.get(`/doctors/${id}`);
export const createDoctor = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'avatar' && data[key]) {
      formData.append('avatar', data[key]);
    } else if (key === 'availability' && Array.isArray(data[key])) {
      formData.append('availability', JSON.stringify(data[key]));
    } else if (key === 'timings' && typeof data[key] === 'object') {
      formData.append('timings', JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  });
  return api.post('/doctors', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateDoctor = (id, data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'avatar' && data[key] instanceof File) {
      formData.append('avatar', data[key]);
    } else if (key === 'availability' && Array.isArray(data[key])) {
      formData.append('availability', JSON.stringify(data[key]));
    } else if (key === 'timings' && typeof data[key] === 'object') {
      formData.append('timings', JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  });
  return api.put(`/doctors/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteDoctor = (id) => api.delete(`/doctors/${id}`);

// Appointment endpoints
export const getAppointments = () => api.get('/appointments');
export const getAppointment = (id) => api.get(`/appointments/${id}`);
export const getUpcomingAppointments = () => api.get('/appointments/upcoming');
export const createAppointment = (data) => api.post('/appointments', data);
export const updateAppointment = (id, data) => api.put(`/appointments/${id}`, data);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);

// User endpoints
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'avatar' && data[key]) {
      formData.append('avatar', data[key]);
    } else {
      formData.append(key, data[key]);
    }
  });
  return api.post('/users', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateUser = (id, data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'avatar' && data[key] instanceof File) {
      formData.append('avatar', data[key]);
    } else {
      formData.append(key, data[key]);
    }
  });
  return api.put(`/users/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteUser = (id) => api.delete(`/users/${id}`);
