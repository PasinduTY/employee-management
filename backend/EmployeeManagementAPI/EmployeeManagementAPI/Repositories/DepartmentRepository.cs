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
    }
}
