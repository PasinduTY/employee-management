import { BrowserRouter, Routes, Route } from "react-router-dom";
import DepartmentList from "../pages/departments/DepartmentList";
import EmployeeList from "../pages/employees/EmployeeList";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
