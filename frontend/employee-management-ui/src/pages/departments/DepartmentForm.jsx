import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDepartment,
  updateDepartment,
  getDepartments,
} from "../../api/departmentApi";
import api from "../../api/api";

function DepartmentForm() {
  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // undefined for create, defined for edit

  // Fetch department details if editing
  useEffect(() => {
    if (id) {
      api
        .get(`/department/${id}`)
        .then((res) => {
          setDepartmentCode(res.data.departmentCode);
          setDepartmentName(res.data.departmentName);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const department = { departmentCode, departmentName };

    try {
      if (id) {
        await updateDepartment(id, department);
      } else {
        await createDepartment(department);
      }
      navigate("/departments"); // back to list
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const handleCancel = () => {
    if (departmentCode || departmentName) {
      if (!window.confirm("Discard changes?")) return;
    }
    navigate("/departments");
  };

  return (
    <div>
      <h2>{id ? "Edit Department" : "Add Department"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Department Code:</label>
          <input
            type="text"
            value={departmentCode}
            onChange={(e) => setDepartmentCode(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Department Name:</label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <button type="submit">{id ? "Update" : "Create"}</button>

          <button
            type="button"
            onClick={handleCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default DepartmentForm;
