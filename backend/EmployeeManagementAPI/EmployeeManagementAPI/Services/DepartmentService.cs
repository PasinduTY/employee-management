using EmployeeManagementAPI.Models;
using EmployeeManagementAPI.Repositories;

namespace EmployeeManagementAPI.Services
{
    public class DepartmentService
    {
        private readonly DepartmentRepository _repository;

        public DepartmentService(DepartmentRepository repository)
        {
            _repository = repository;
        }

        public List<Department> GetDepartments()
        {
            return _repository.GetAll();
        }

        public Department GetDepartmentById(int id) 
        { 
            return _repository.GetById(id); 
        }

        public int CreateDepartment(Department department)
        {
            var existing = _repository.GetAll().Find(d => d.DepartmentCode == department.DepartmentCode);
            if (existing != null)
            {
                throw new Exception("Department code already exists");
            }
                
            return _repository.Add(department);
        }

        public bool UpdateDepartment(int id, Department department)
        {
            return _repository.Update(id, department);
        }

        public bool DeleteDepartment(int id)
        {
            return _repository.Delete(id);
        }
    }
}
