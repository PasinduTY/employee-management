import { BrowserRouter, Routes, Route } from "react-router-dom";
import DepartmentList from "../pages/departments/DepartmentList";
import EmployeeList from "../pages/employees/EmployeeList";
import DepartmentForm from "../pages/departments/DepartmentForm";
import EmployeeForm from "../pages/employees/EmployeeForm";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/departments/create" element={<DepartmentForm />} />
        <Route path="/departments/edit/:id" element={<DepartmentForm />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/create" element={<EmployeeForm />} />
        <Route path="/employees/edit/:id" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
