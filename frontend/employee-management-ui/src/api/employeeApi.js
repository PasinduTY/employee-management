import api from "./api";

// Get all employees
export const getEmployees = () => api.get("/employee");

// Get employee by id
export const getEmployee = (id) => api.get(`/employee/${id}`);

// Create employee
export const createEmployee = (employee) => api.post("/employee", employee);

// Update employee
export const updateEmployee = (id, employee) =>
  api.put(`/employee/${id}`, employee);

// Delete employee
export const deleteEmployee = (id) => api.delete(`/employee/${id}`);
