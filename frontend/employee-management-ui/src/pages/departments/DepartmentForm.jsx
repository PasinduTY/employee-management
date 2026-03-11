// src/pages/departments/DepartmentForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDepartment, updateDepartment } from "../../api/departmentApi";
import api from "../../api/api";
import Notification from "../../components/Notification";

function DepartmentForm() {
  const [form, setForm] = useState({ departmentCode: "", departmentName: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams(); // undefined for create, defined for edit
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
  });

  // Fetch department details if editing
  useEffect(() => {
    if (id) {
      api
        .get(`/department/${id}`)
        .then((res) => setForm(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!form.departmentCode.trim())
      newErrors.departmentCode = "Code is required";
    if (!form.departmentName.trim())
      newErrors.departmentName = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (id) await updateDepartment(id, form);
      else await createDepartment(form);

      setNotification({
        message: id
          ? "Department updated successfully"
          : "Department created successfully",
        type: "success",
      });

      setTimeout(() => navigate("/departments"), 1000);
    } catch (error) {
      console.error("Error saving department:", error);
      setNotification({ message: "Failed to save department", type: "error" });
    }
  };

  const handleCancel = () => {
    if (
      (form.departmentCode || form.departmentName) &&
      !window.confirm("Discard changes?")
    )
      return;
    navigate("/departments");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{id ? "Edit Department" : "Add Department"}</h2>

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "success" })}
      />

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Department Code</label>
          <input
            className={`form-control ${errors.departmentCode ? "is-invalid" : ""}`}
            name="departmentCode"
            value={form.departmentCode}
            onChange={handleChange}
          />
          {errors.departmentCode && (
            <div className="invalid-feedback">{errors.departmentCode}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Department Name</label>
          <input
            className={`form-control ${errors.departmentName ? "is-invalid" : ""}`}
            name="departmentName"
            value={form.departmentName}
            onChange={handleChange}
          />
          {errors.departmentName && (
            <div className="invalid-feedback">{errors.departmentName}</div>
          )}
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-success me-2">
            {id ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default DepartmentForm;
