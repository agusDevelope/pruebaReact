using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backendEmpleados.Models
{
    public class Empleado
    {
        public int idEmp { get; set; }
        public string nomEmp { get; set; }
        public string nomArea { get; set; }
        public string fechaInicio { get; set; }
        public string fechaFin { get; set; }
        public string email { get; set; }
        public string foto { get; set; }
    }
}
