const calcular = () => {
    const r = document.getElementById("inp_radio").value;
    const resultado = (Math.PI)*(Math.pow(r,2));
    document.getElementById("h_resultado").textContent = 'El resultado: '+resultado;
}
const boton = document.getElementById("btn_calcular");
boton.addEventListener("click",calcular);