import api from "./api";

// Get all departments
export const getDepartments = () => api.get("/department");

// Create a new department
export const createDepartment = (department) =>
  api.post("/department", department);

// Update an existing department
export const updateDepartment = (id, department) =>
  api.put(`/department/${id}`, department);

// Delete a department
export const deleteDepartment = (id) => api.delete(`/department/${id}`);
