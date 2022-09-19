using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using backendEmpleados.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace backendEmpleados.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public EmpleadoController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select idEmp, nomEmp, nomArea, convert(varchar(10),fechaInicio,120) as fechaInicio, convert(varchar(10),fechaFin,120) as fechaFin, email, foto from 
                dbo.empleados";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("empleadosAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Empleado emp)
        {
            string query = @"
                insert into dbo.empleados
                                (nomEmp,nomArea,fechaInicio,fechaFin,email,foto)
                        values(@nomEmp,@nomArea,@fechaInicio,@fechaFin,@email,@foto)
                        ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("empleadosAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@nomEmp", emp.nomEmp);
                    myCommand.Parameters.AddWithValue("@nomArea", emp.nomArea);
                    myCommand.Parameters.AddWithValue("@fechaInicio", emp.fechaInicio);
                    myCommand.Parameters.AddWithValue("@fechaFin", emp.fechaFin);
                    myCommand.Parameters.AddWithValue("@email", emp.email);
                    myCommand.Parameters.AddWithValue("@foto", emp.foto);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Agregado Exitosamente");
        }

        [HttpPut]
        public JsonResult Put(Empleado emp)
        {
            string query = @"
                update dbo.areas
                       set nomEmp = @nomEmp , nomArea= @nomArea,  
                            fechaInicio=@fechaInicio, fechaFin= @fechaFin,
                            email = @email, foto = @foto
                            where idArea = @idArea
                        ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("empleadosAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idEmp", emp.idEmp);
                    myCommand.Parameters.AddWithValue("@nomEmp", emp.nomEmp);
                    myCommand.Parameters.AddWithValue("@nomArea", emp.nomArea);
                    myCommand.Parameters.AddWithValue("@fechaInicio", emp.fechaInicio);
                    myCommand.Parameters.AddWithValue("@fechaFin", emp.fechaFin);
                    myCommand.Parameters.AddWithValue("@email", emp.email);
                    myCommand.Parameters.AddWithValue("@foto", emp.foto);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Actualizado Exitosamente");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                delete from dbo.empleados
                            where idEmp = @idEmp
                        ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("empleadosAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idArea", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Eliminado Exitosamente");
        }
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("users.png");
            }
        }
    }
}
