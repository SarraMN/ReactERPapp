import axios from 'axios';

const BASE_URL = process.env.hostUrl || 'http://localhost:8080/api/timesheets';

// Helper function to get the token from localStorage
const getToken = () => localStorage.getItem('USER_KEY');

// Common headers for authorization
const getHeaders = () => ({
  Authorization: 'Bearer ' + getToken(),
});

// Get all timesheets
export const getAllTimeSheets = () => {
  return axios({
    method: 'GET',
    url: `${BASE_URL}`,
    headers: getHeaders(),
  });
};

export const getAllTraitedTimeSheets = () => {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/getAllTraited`,
    headers: getHeaders(),
  });
};

export const getAllNotTraitedTimeSheets = () => {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/getAllNotTraited`,
    headers: getHeaders(),
  });
};

// Get a timesheet by ID
export const getTimeSheetById = (id) => {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/${id}`,
    headers: getHeaders(),
  });
};

// Get timesheets by employee
export const getTimeSheetsByEmployee = (employeeId) => {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/employee/${employeeId}`,
    headers: getHeaders(),
  });
};

// Get timesheets by specific date
export const getTimeSheetsByDate = (date) => {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/date/${date}`,
    headers: getHeaders(),
  });
};

// Create a new timesheet
export const createTimeSheet = (timeSheet) => {
  return axios({
    method: 'POST',
    url: BASE_URL,
    data: timeSheet,
    headers: getHeaders(),
  });
};

// Approve a timesheet
export const approveTimeSheet = (id, approvedBy) => {
  return axios({
    method: 'PUT',
    url: `${BASE_URL}/approve/${id}/${approvedBy}`,
    headers: getHeaders(),
  });
};

// Reject a timesheet
export const rejectTimeSheet = (id, rejectedBy) => {
  return axios({
    method: 'PUT',
    url: `${BASE_URL}/reject/${id}/${rejectedBy}`,
    headers: getHeaders(),
  });
};

// Update an existing timesheet
export const updateTimeSheet = (id, timeSheet) => {
  return axios({
    method: 'PUT',
    url: `${BASE_URL}/${id}`,
    data: timeSheet,
    headers: getHeaders(),
  });
};

export const filterLogsByCriteria = (filters) => {
  const params = new URLSearchParams(filters).toString();
  return axios({
    method: 'GET',
    url: `${BASE_URL}/filter?${params}`,
    headers: getHeaders(),
  });
};

export const DeleteLog = (id) => {
  return axios({
    method: 'Delete',
    url: `${BASE_URL}/${id}`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}