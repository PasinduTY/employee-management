using Microsoft.Data.SqlClient;
using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.Models;

namespace EmployeeManagementAPI.Repositories
{
    public class DepartmentRepository
    {
        private readonly DbConnectionFactory _connectionFactory;

        public DepartmentRepository(DbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        // GET all
        public List<Department> GetAll()
        {
            var departments = new List<Department>();
            using (var connection = _connectionFactory.CreateConnection())
            {
                string query = "SELECT * FROM Department";
                SqlCommand cmd = new SqlCommand(query, connection);
                connection.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    departments.Add(new Department
                    {
                        DepartmentId = (int)reader["DepartmentId"],
                        DepartmentCode = reader["DepartmentCode"].ToString(),
                        DepartmentName = reader["DepartmentName"].ToString()
                    });
                }
            }
            return departments;
        }

        // GET by ID
        public Department GetById(int id)
        {
            Department department = null;
            using (var connection = _connectionFactory.CreateConnection())
            {
                string query = "SELECT * FROM Department WHERE DepartmentId = @Id";
                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@Id", id); // Parameterized query
                connection.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    department = new Department
                    {
                        DepartmentId = (int)reader["DepartmentId"],
                        DepartmentCode = reader["DepartmentCode"].ToString(),
                        DepartmentName = reader["DepartmentName"].ToString()
                    };
                }
            }
            return department;
        }

        // CREATE
        public int Add(Department department)
        {
            using (var connection = _connectionFactory.CreateConnection())
            {
                string query = @"INSERT INTO Department (DepartmentCode, DepartmentName)
                         VALUES (@Code, @Name);
                         SELECT SCOPE_IDENTITY();";

                SqlCommand cmd = new SqlCommand(query, connection);

                cmd.Parameters.AddWithValue("@Code", department.DepartmentCode);
                cmd.Parameters.AddWithValue("@Name", department.DepartmentName);

                connection.Open();

                var id = cmd.ExecuteScalar();

                return Convert.ToInt32(id);
            }
        }

        // UPDATE
        public bool Update(int id, Department department)
        {
            using (var connection = _connectionFactory.CreateConnection())
            {
                string query = "UPDATE Department SET DepartmentCode=@Code, DepartmentName=@Name WHERE DepartmentId=@Id";
                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@Code", department.DepartmentCode);
                cmd.Parameters.AddWithValue("@Name", department.DepartmentName);
                cmd.Parameters.AddWithValue("@Id", id);
                connection.Open();
                int rows = cmd.ExecuteNonQuery();
                return rows > 0; // returns true if update succeeded
            }
        }

        // DELETE
        public bool Delete(int id)
        {
            using (var connection = _connectionFactory.CreateConnection())
            {
                string query = "DELETE FROM Department WHERE DepartmentId=@Id";
                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@Id", id);
                connection.Open();
                int rows = cmd.ExecuteNonQuery();
                return rows > 0; // true if delete succeeded
            }
        }
    }
}
