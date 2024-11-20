import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('USER_KEY');
};

const BASE_URL = process.env.hostUrl || 'http://localhost:8080';

// Get list of leaves by user ID
export const GetListConges = (userId) => {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/api/leaves/GetLeavesByUser/${userId}`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  });
};
// Get a leave request by ID
export const getLeaveById = (leaveId) => {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/api/leaves/${leaveId}`,  // Utilisation de l'ID pour récupérer le congé
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  });
};
// Delete a leave by ID
export const deleteLeave = (leaveId) => {
  return axios({
    method: 'DELETE',
    url: `${BASE_URL}/api/leaves/delete/${leaveId}`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  });
};

// Create a new leave request
export const CreateConge = (leaveRequest) => {
  return axios({
    method: 'POST',
    url: `${BASE_URL}/api/leaves`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': 'application/json',
    },
    data: leaveRequest,
  });
};

// Approve a leave request
export const ApproveConge = (leaveId, approvedBy) => {
  return axios({
    method: 'PUT',
    url: `${BASE_URL}/api/leaves/${leaveId}/approve`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': 'application/json',
    },
    data: approvedBy,
  });
};

// Reject a leave request
export const RejectConge = (leaveId, disapprovedBy) => {
  return axios({
    method: 'PUT',
    url: `${BASE_URL}/api/leaves/${leaveId}/reject`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': 'application/json',
    },
    data: disapprovedBy,
  });
};

// Get all pending leaves
export const getPendingLeaves = () => {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/api/leaves/pending`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  });
};

// Get all non-pending leaves
export const getNonPendingLeaves = () => {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/api/leaves/non-pending`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  });
};
