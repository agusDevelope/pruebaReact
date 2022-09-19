import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Empleados extends Component{

    constructor(props){
        super(props);

        this.state={
            areas:[],
            empleados:[],
            modalTitle:"",
            idEmp:0,
            nomEmp:"",
            nomArea:"",
            fechaInicio:"",
            fechaFin:"",
            email:"",
            FotoFileName:"users.png",
            FotoPath:variables.PHOTO_URL
        }
    }

    refreshList(){

        fetch(variables.API_URL+'Empleado')
        .then(response=>response.json())
        .then(data=>{
            this.setState({employees:data});
        });

        fetch(variables.API_URL+'Area')
        .then(response=>response.json())
        .then(data=>{
            this.setState({areas:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeNombreEmpleado =(e)=>{
        this.setState({nomEmp:e.target.value});
    }
    changeNombreArea =(e)=>{
        this.setState({nomArea:e.target.value});
    }
    changeFechaInicio =(e)=>{
        this.setState({fechaInicio:e.target.value});
    }
    changeFechaFin =(e)=>{
        this.setState({fechaFin:e.target.value});
    }
    changeEmail =(e)=>{
        this.setState({fechaEmail:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Agregar Empleado",
            idEmp:0,
            nomEmp:"",
            nomArea:"",
            fechaInicio:"",
            fechaFin:"",
            email:"",
            FotoFileName:"users.png"
        });
    }
    editClick(emp){
        this.setState({
            modalTitle:"Editar Empleado",
            idEmp:emp.idEmp,
            nomEmp:emp.nomEmp,
            nomArea:emp.nomArea,
            fechaInicio:emp.fechaInicio,
            fechaFin:emp.fechaFin,
            email:emp.email,
            FotoFileName:emp.FotoFileName
        });
    }

    createClick(){
        fetch(variables.API_URL+'Empleafo',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                nomEmp:this.state.nomEmp,
                nomArea:this.state.nomArea,
                fechaInicio:this.state.fechaInicio,
                fechaFin:this.state.fechaFin,
                email:this.state.email,
                FotoFileName:this.state.FotoFileName
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'Empleado',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                idEmp:this.state.idEmp,
                nomEmp:this.state.nomEmp,
                nomArea:this.state.nomArea,
                fechaInicio:this.state.fechaInicio,
                fechaFin:this.state.fechaFin,
                email:this.state.email,
                FotoFileName:this.state.FotoFileName
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('¿Estas seguro?')){
        fetch(variables.API_URL+'Empleado/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'Empleado/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({FotoFileName:data});
        })
    }

    render(){
        const {
            areas,
            empleados,
            modalTitle,
            idEmp,
            nomEmp,
            nomArea,
            fechaInicio,
            fechaFin,
            email,
            FotoPath,
            FotoFileName
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Agregar Empleado
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            ID 
        </th>
        <th>
            Nombre empleado
        </th>
        <th>
            Área
        </th>
        <th>
           Fecha Inicio
        </th>
        <th>
           Fecha Fin
        </th>
        <th>
           Email
        </th>
        <th>
            Acciones
        </th>
    </tr>
    </thead>
    <tbody>
        {empleados.map(emp=>
            <tr key={emp.idEmp}>
                <td>{emp.idEmp}</td>
                <td>{emp.nomEmp}</td>
                <td>{emp.nomArea}</td>
                <td>{emp.fechaInicio}</td>
                <td>{emp.fechaFin}</td>
                <td>{emp.email}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(emp)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(emp.idEmp)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
    <div className="d-flex flex-row bd-highlight mb-3">
     
     <div className="p-2 w-50 bd-highlight">
    
        <div className="input-group mb-3">
            <span className="input-group-text">Nombre Empleado</span>
            <input type="text" className="form-control"
            value={nomEmp}
            onChange={this.changeNombreEmpleado}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Área</span>
            <select className="form-select"
            onChange={this.changeNombreArea}
            value={nomArea}>
                {areas.map(dep=><option key={dep.idArea}>
                    {dep.nombreArea}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Ingreso</span>
            <input type="date" className="form-control"
            value={fechaInicio}
            onChange={this.changeFechaInicio}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Baja</span>
            <input type="date" className="form-control"
            value={fechaFin}
            onChange={this.changeFechaFin}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Correo</span>
            <input type="date" className="form-control"
            value={email}
            onChange={this.changeEmail}/>
        </div>

     </div>
     {/* <div className="p-2 w-50 bd-highlight">
         <img width="250px" height="250px"
         src={FotoPath+FotoFileName}/>
         <input className="m-2" type="file" onChange={this.imageUpload}/>
     </div> */}
    </div>

    {idEmp===0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {idEmp!==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}
   </div>

</div>
</div> 
</div>


</div>
        )
    }
}