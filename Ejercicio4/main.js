 const calcular = () => {
    const vi = document.getElementById("inp_vi").value;
    const vf = document.getElementById("inp_vf").value;
    const resultado = (vf-vi)/ 9.81
    return resultado
 }
const mostrar = () => {
    const respuesta = calcular ()
    document.getElementById ("r1").textContent = respuesta
}
const boton = document.getElementById("btn_calcular");
boton.addEventListener("click",mostrar);
