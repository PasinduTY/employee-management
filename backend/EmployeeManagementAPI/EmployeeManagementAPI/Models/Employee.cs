namespace EmployeeManagementAPI.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int Age
        {
            get
            {
                var today = DateTime.Today;
                var age = today.Year - DateOfBirth.Year;
                if (DateOfBirth.Date > today.AddYears(-age)) 
                {
                    return age--;
                }
                return age;
            }
        }

        public decimal Salary { get; set; }

        public int DepartmentId { get; set; }

        // Optional: include department name for joins
        public string DepartmentName { get; set; }
    }
}
