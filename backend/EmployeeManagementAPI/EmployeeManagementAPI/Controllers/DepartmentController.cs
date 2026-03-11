using EmployeeManagementAPI.DTOs;
using EmployeeManagementAPI.Models;
using EmployeeManagementAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly DepartmentService _service;

        public DepartmentController(DepartmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var departments = _service.GetDepartments();

            return Ok(departments);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var department = _service.GetDepartmentById(id);
            if (department == null)
            {
                return NotFound();
            }
            return Ok(department);
        }

        [HttpPost]
        public IActionResult Create([FromBody] DepartmentCreateDTO dto)
        {
            try
            {
                var department = new Department
                {
                    DepartmentCode = dto.DepartmentCode,
                    DepartmentName = dto.DepartmentName
                };

                int id = _service.CreateDepartment(department);
                department.DepartmentId = id;

                return Ok(department);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] DepartmentCreateDTO dto)
        {
            try
            {
                var department = new Department
                {
                    DepartmentId = id,
                    DepartmentCode = dto.DepartmentCode,
                    DepartmentName = dto.DepartmentName
                };

                bool updated = _service.UpdateDepartment(id, department);

                if (!updated)
                    return NotFound(new { message = "Department not found" });

                return Ok(department);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            bool deleted = _service.DeleteDepartment(id);
            if (!deleted)
            {
                return NotFound();
            }
            return Ok($"Department {id} deleted successfully");
        }
    }
}
