import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../api/employeeApi";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/Notification";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
  });

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
      setNotification({
        message: "Employee deleted successfully",
        type: "success",
      });
      fetchEmployees();
    } catch (error) {
      setNotification({ message: "Delete failed", type: "error" });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employees</h2>

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "success" })}
      />

      <button
        className="btn btn-primary"
        onClick={() => navigate("/employees/create")}
      >
        Add Employee
      </button>

      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
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
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/employees/edit/${emp.employeeId}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(emp.employeeId)}
                >
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
