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
    <div>
      <h2>{id ? "Edit Employee" : "Add Employee"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="dateOfBirth"
          type="date"
          value={form.dateOfBirth}
          onChange={handleChange}
          required
        />

        <div>Age: {age}</div>

        <input
          name="salary"
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          required
        />

        <select
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

        <div style={{ marginTop: "10px" }}>
          <button type="submit">{id ? "Update" : "Create"}</button>

          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
