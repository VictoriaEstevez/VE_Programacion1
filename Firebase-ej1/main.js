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
    //Vaciar los input 
    document.getElementById("inp_nom").value= '';
    document.getElementById("inp_ape").value= '';
    document.getElementById("inp_dni").value= '';
    listar_clientes();
}
const boton = document.getElementById("btn_obtener")
boton.addEventListener("click",guardarCliente)

//eliminar cliente
function eliminar(id){
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
                <button onclick="eliminar('${element.id}')"class="btn btn-danger btn-sa"> <i class="fa fa-trash"></i> </button>
                </td> 
            </tr>     
        `
        total_filas.push(fila)
    });
    document.getElementById("tbody").innerHTML=total_filas.join(``)
}
//ejercutar funcion
listar_clientes()