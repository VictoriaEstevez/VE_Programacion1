//Nos conectamos con la base de datos Firestores
const db = firebase.firestore()
const guardarCliente = async () => {
    const nombre = document.getElementById("inp_nom").value
    const apellido = document.getElementById("inp_ape").value
    const dni = document.getElementById("inp_dni").value
    const unCliente = {
        nombre,
        apellido,
        dni
    }
    //Se insertan los datos
    await db.collection("Clientes").doc().set(unCliente)
    listar_clientes();
    vaciar();
}
const boton = document.getElementById("btn_obtener")
boton.addEventListener("click",guardarCliente)

//eliminar cliente
function eliminar(){
    const id = document.getElementById("inp_id").value
    db.collection("Clientes").doc(id).delete()
    listar_clientes();
}
const listar_clientes = async() =>{
    const clientes = await db.collection("Clientes").get();

    let lista_clientes = []
    
    const lista = clientes.docs.map(doc =>{
        lista_clientes = doc.data()
        lista_clientes.id = doc.id;
        return lista_clientes;
    });
    let total_filas = []
    lista.forEach(element =>{
        let fila= `
            <tr>
                <td>${element.nombre}</td> 
                <td>${element.apellido}</td> 
                <td>${element.dni}</td> 
                <td>
                <button onclick="llenar_input_oculto('${element.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" "class="btn btn-danger btn-sa"> <i class="fa fa-trash"></i> </button>
                <button onclick="editar_cliente('${element.nombre}','${element.apellido}',${element.dni},'${element.id}')"class="btn btn-success btn-sm"> <i class="fa fa-edit"></i> </button>
                
                </td> 
            </tr>     
        `
        total_filas.push(fila)
    });
    document.getElementById("tbody").innerHTML=total_filas.join(``)
}
//ejercutar funcion
listar_clientes()

function llenar_input_oculto(id){
    document.getElementById("inp_id").value = id;
}

function editar_cliente(nom,ape,dni,id){
    document.getElementById("inp_nom").value = nom;
    document.getElementById("inp_ape").value = ape;
    document.getElementById("inp_dni").value = dni;
    document.getElementById("inp_id").value = id;
} 
function actualizar_cliente(){
    const nom = document.getElementById("inp_nom").value
    const ape = document.getElementById("inp_ape").value
    const dni = document.getElementById("inp_dni").value
    const id = document.getElementById("inp_id").value
    const clienteActualizado = {
        nombre:nom,
        apellido:ape,
        dni:dni,
    }
    db.collection("Clientes").doc(id).update(clienteActualizado);
    //Refrescar la tabla
    listar_clientes();
    //Vaciar el formulario
    vaciar();
}
function vaciar(){
    document.getElementById("inp_nom").value = '';
    document.getElementById("inp_ape").value = '';
    document.getElementById("inp_dni").value = '';
    document.getElementById("inp_id").value = '';

}