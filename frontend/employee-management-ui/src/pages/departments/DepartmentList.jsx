import { useEffect, useState } from "react";
import { getDepartments, deleteDepartment } from "../../api/departmentApi";
import { useNavigate } from "react-router-dom";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  // Fetch departments from backend
  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await deleteDepartment(id);
        fetchDepartments(); // refresh list
      } catch (error) {
        console.error("Error deleting department:", error);
      }
    }
  };

  return (
    <div>
      <h2>Departments</h2>
      <button onClick={() => navigate("/departments/create")}>
        Add Department
      </button>

      <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.departmentId}>
              <td>{dept.departmentId}</td>
              <td>{dept.departmentCode}</td>
              <td>{dept.departmentName}</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/departments/edit/${dept.departmentId}`)
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(dept.departmentId)}>
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

export default DepartmentList;
