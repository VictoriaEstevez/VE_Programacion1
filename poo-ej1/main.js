import Bhaskara from './bhaskara.js'
const mostrar = () => {
    const a = document.getElementById("inp_a").value
    const b = document.getElementById("inp_b").value
    const c = document.getElementById("inp_c").value
    /* 
        1-Se crea la instancia
        2-Se envia los parametros al constructor
        3-Se ejecuta el constructor
    */
    const instancia = new Bhaskara (a,b,c)
    // Haciendo uso de la instancia ejecutamos el 
    //metodo de la clase calcular_r1()
    const raiz1 = instancia.calcular_r1()
    const raiz2 = instancia.calcular_r2()
    document.getElementById("r1").textContent = 'Raiz 1 '+raiz1  
    document.getElementById("r2").textContent = 'Raiz 2 '+raiz2  
}
const boton = document.getElementById("btn_calcular")
boton.addEventListener("click", mostrar)