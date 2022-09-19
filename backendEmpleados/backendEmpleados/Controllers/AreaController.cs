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

namespace backendEmpleados.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AreaController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AreaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select idArea, nombreArea from 
                dbo.areas";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("empleadosAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand = new SqlCommand(query, myCon))
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
        public JsonResult Post(Area area)
        {
            string query = @"
                insert into dbo.areas
                        values(@nombreArea)
                        ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("empleadosAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@nombreArea", area.nombreArea);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Agregado Exitosamente");
        }

        [HttpPut("{id}")]
        public JsonResult Put(Area area)
        {
            string query = @"
                update dbo.areas
                       set nombreArea = (@nombreArea)
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
                    myCommand.Parameters.AddWithValue("@idArea", area.idArea);
                    myCommand.Parameters.AddWithValue("@nombreArea", area.nombreArea);
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
                delete from dbo.areas
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
                    myCommand.Parameters.AddWithValue("@idArea", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Eliminado Exitosamente");
        }
    }
}
