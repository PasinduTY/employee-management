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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await updateEmployee(id, form);
      } else {
        await createEmployee(form);
      }

      navigate("/employees");
    } catch (err) {
      console.error(err);
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
            className="form-control"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            className="form-control"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            className="form-control"
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <div className="form-control bg-light">{age}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            className="form-control"
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>

          <select
            className="form-select"
            name="departmentId"
            value={form.departmentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>

            {departments.map((dep) => (
              <option key={dep.departmentId} value={dep.departmentId}>
                {dep.departmentName}
              </option>
            ))}
          </select>
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
