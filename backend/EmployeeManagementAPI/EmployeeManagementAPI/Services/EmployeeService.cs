using EmployeeManagementAPI.Models;
using EmployeeManagementAPI.Repositories;
using System.Text.RegularExpressions;

namespace EmployeeManagementAPI.Services
{
    public class EmployeeService
    {
        private readonly EmployeeRepository _repository;

        public EmployeeService(EmployeeRepository repository)
        {
            _repository = repository;
        }

        public List<Employee> GetEmployees()
        {
            return _repository.GetAll();
        }

        public Employee GetEmployeeById(int id) 
        {
         return _repository.GetById(id);
        }
    

        public int CreateEmployee(Employee employee)
        {
            if (string.IsNullOrEmpty(employee.FirstName) || string.IsNullOrEmpty(employee.LastName))
            {
                throw new Exception("FirstName and LastName are required");
            }
                
            if (!Regex.IsMatch(employee.Email ?? "", @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            {
                throw new Exception("Invalid email address");
            }

            if (employee.Salary < 0)
            {
                throw new Exception("Salary cannot be negative");
            }

            return _repository.Add(employee);
        }

        public bool UpdateEmployee(int id, Employee employee)
        { 
            return _repository.Update(id, employee); 
        }

        public bool DeleteEmployee(int id)
        {
            return _repository.Delete(id);
        }
    }
}
