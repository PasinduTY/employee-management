using Microsoft.Data.SqlClient;
using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.Models;

namespace EmployeeManagementAPI.Repositories
{
    public class EmployeeRepository
    {
        private readonly DbConnectionFactory _connectionFactory;

        public EmployeeRepository(DbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        // GET all employees with department name
        public List<Employee> GetAll()
        {
            var employees = new List<Employee>();
            using (var connection = _connectionFactory.CreateConnection())
            {
                string query = @"
                    SELECT e.EmployeeId, e.FirstName, e.LastName, e.Email, e.DateOfBirth, e.Salary, 
                           e.DepartmentId, d.DepartmentName
                    FROM Employee e
                    JOIN Department d ON e.DepartmentId = d.DepartmentId";

                SqlCommand cmd = new SqlCommand(query, connection);
                connection.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    employees.Add(new Employee
                    {
                        EmployeeId = (int)reader["EmployeeId"],
                        FirstName = reader["FirstName"].ToString(),
                        LastName = reader["LastName"].ToString(),
                        Email = reader["Email"].ToString(),
                        DateOfBirth = (DateTime)reader["DateOfBirth"],
                        Salary = (decimal)reader["Salary"],
                        DepartmentId = (int)reader["DepartmentId"],
                        DepartmentName = reader["DepartmentName"].ToString()
                    });
                }
            }
            return employees;
        }

        // GET by ID
        public Employee GetById(int id)
        {
            Employee employee = null;
            using (var connection = _connectionFactory.CreateConnection())
            {
                string query = @"
                    SELECT e.EmployeeId, e.FirstName, e.LastName, e.Email, e.DateOfBirth, e.Salary, 
                           e.DepartmentId, d.DepartmentName
                    FROM Employee e
                    JOIN Department d ON e.DepartmentId = d.DepartmentId
                    WHERE e.EmployeeId=@Id";

                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@Id", id);
                connection.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    employee = new Employee
                    {
                        EmployeeId = (int)reader["EmployeeId"],
                        FirstName = reader["FirstName"].ToString(),
                        LastName = reader["LastName"].ToString(),
                        Email = reader["Email"].ToString(),
                        DateOfBirth = (DateTime)reader["DateOfBirth"],
                        Salary = (decimal)reader["Salary"],
                        DepartmentId = (int)reader["DepartmentId"],
                        DepartmentName = reader["DepartmentName"].ToString()
                    };
                }
            }
            return employee;
        }

        // CREATE
        public int Add(Employee employee)
        {
            using (var connection = _connectionFactory.CreateConnection())
            {
                string query = @"
                    INSERT INTO Employee 
                    (FirstName, LastName, Email, DateOfBirth, Salary, DepartmentId)
                    VALUES (@FirstName, @LastName, @Email, @DOB, @Salary, @DeptId);
                    SELECT SCOPE_IDENTITY(); ";

                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@FirstName", employee.FirstName);
                cmd.Parameters.AddWithValue("@LastName", employee.LastName);
                cmd.Parameters.AddWithValue("@Email", employee.Email);
                cmd.Parameters.AddWithValue("@DOB", employee.DateOfBirth);
                cmd.Parameters.AddWithValue("@Salary", employee.Salary);
                cmd.Parameters.AddWithValue("@DeptId", employee.DepartmentId);

                connection.Open();
                var id = cmd.ExecuteScalar();
                return Convert.ToInt32(id);
            }
        }

        // UPDATE
        public bool Update(int id, Employee employee)
        {
            using (var connection = _connectionFactory.CreateConnection())
            {
                string query = @"
                    UPDATE Employee SET
                        FirstName=@FirstName,
                        LastName=@LastName,
                        Email=@Email,
                        DateOfBirth=@DOB,
                        Salary=@Salary,
                        DepartmentId=@DeptId
                    WHERE EmployeeId=@Id";

                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@FirstName", employee.FirstName);
                cmd.Parameters.AddWithValue("@LastName", employee.LastName);
                cmd.Parameters.AddWithValue("@Email", employee.Email);
                cmd.Parameters.AddWithValue("@DOB", employee.DateOfBirth);
                cmd.Parameters.AddWithValue("@Salary", employee.Salary);
                cmd.Parameters.AddWithValue("@DeptId", employee.DepartmentId);
                cmd.Parameters.AddWithValue("@Id", id);

                connection.Open();
                int rows = cmd.ExecuteNonQuery();
                return rows > 0;
            }
        }

        // DELETE
        public bool Delete(int id)
        {
            using (var connection = _connectionFactory.CreateConnection())
            {
                string query = "DELETE FROM Employee WHERE EmployeeId=@Id";
                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@Id", id);
                connection.Open();
                int rows = cmd.ExecuteNonQuery();
                return rows > 0;
            }
        }
    }
}
