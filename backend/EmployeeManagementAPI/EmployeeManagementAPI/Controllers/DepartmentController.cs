using Microsoft.AspNetCore.Mvc;
using EmployeeManagementAPI.Services;

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
        public IActionResult GetDepartments()
        {
            var departments = _service.GetDepartments();

            return Ok(departments);
        }
    }
}
