import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../api/employeeApi";
import { useNavigate } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div>
      <h2>Employees</h2>

      <button onClick={() => navigate("/employees/create")}>
        Add Employee
      </button>

      <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employeeId}>
              <td>{emp.employeeId}</td>

              <td>
                {emp.firstName} {emp.lastName}
              </td>

              <td>{emp.email}</td>

              <td>{new Date(emp.dateOfBirth).toLocaleDateString()}</td>

              <td>{emp.age}</td>

              <td>{emp.salary}</td>

              <td>{emp.departmentName}</td>

              <td>
                <button
                  onClick={() => navigate(`/employees/edit/${emp.employeeId}`)}
                >
                  Edit
                </button>

                <button onClick={() => handleDelete(emp.employeeId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
