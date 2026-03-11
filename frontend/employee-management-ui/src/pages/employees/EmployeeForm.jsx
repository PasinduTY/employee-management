import { useState, useEffect } from "react";
import {
  createEmployee,
  updateEmployee,
  getEmployee,
} from "../../api/employeeApi";
import { getDepartments } from "../../api/departmentApi";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    salary: "",
    departmentId: "",
  });

  const [errors, setErrors] = useState({});

  const [age, setAge] = useState(0);

  useEffect(() => {
    fetchDepartments();

    if (id) {
      loadEmployee();
    }
  }, []);

  const fetchDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res.data);
  };

  const loadEmployee = async () => {
    const res = await getEmployee(id);

    setForm({
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      email: res.data.email,
      dateOfBirth: res.data.dateOfBirth.split("T")[0],
      salary: res.data.salary,
      departmentId: res.data.departmentId,
    });

    setAge(res.data.age);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setAge(age);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    if (name === "dateOfBirth") {
      calculateAge(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name
    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last Name
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // DOB
    if (!form.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const dob = new Date(form.dateOfBirth);
      const today = new Date();

      if (dob > today) {
        newErrors.dateOfBirth = "DOB cannot be in the future";
      }

      if (age < 18) {
        newErrors.dateOfBirth = "Employee must be at least 18 years old";
      }
    }

    // Salary
    if (!form.salary) {
      newErrors.salary = "Salary is required";
    } else if (form.salary <= 0) {
      newErrors.salary = "Salary must be greater than 0";
    }

    // Department
    if (!form.departmentId) {
      newErrors.departmentId = "Please select a department";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      if (id) {
        await updateEmployee(id, form);
      } else {
        await createEmployee(form);
      }

      navigate("/employees");
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleCancel = () => {
    if (form.firstName || form.lastName || form.email || form.salary) {
      const confirmLeave = window.confirm("Discard changes?");

      if (!confirmLeave) return;
    }

    navigate("/employees");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{id ? "Edit Employee" : "Add Employee"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>

          <input
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />

          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>

          <input
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />

          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth</label>

          <input
            className={`form-control ${errors.dateOfBirth ? "is-invalid" : ""}`}
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
          />

          {errors.dateOfBirth && (
            <div className="invalid-feedback">{errors.dateOfBirth}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <div className="form-control bg-light">{age}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>

          <input
            className={`form-control ${errors.salary ? "is-invalid" : ""}`}
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
          />

          {errors.salary && (
            <div className="invalid-feedback">{errors.salary}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>

          <select
            className={`form-select ${errors.departmentId ? "is-invalid" : ""}`}
            name="departmentId"
            value={form.departmentId}
            onChange={handleChange}
          >
            <option value="">Select Department</option>

            {departments.map((dep) => (
              <option key={dep.departmentId} value={dep.departmentId}>
                {dep.departmentName}
              </option>
            ))}
          </select>

          {errors.departmentId && (
            <div className="invalid-feedback">{errors.departmentId}</div>
          )}
        </div>

        <div className="mt-3">
          <button className="btn btn-success me-2" type="submit">
            {id ? "Update" : "Create"}
          </button>

          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
