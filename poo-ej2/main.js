import Area from './area.js'
const mostrar = () => {
    const Bs = document.getElementById("inp_BS").value;
    const Bi = document.getElementById("inp_BI").value;
    const A =document.getElementById("inp_A").value;

    const instancia = new Area(Bs,Bi,A)

    const R1 = instancia.calcularAreaTrap()
    document.getElementById("r1").textContent = 'El area del trapecio es:'+R1 
}
const boton = document.getElementById("btn_calcular")
boton.addEventListener("click", mostrar)


const mostrar2 = () => {
    const BT = document.getElementById("inp_BT").value;
    const AT = document.getElementById("inp_AT").value;

    const instancia = new Area('','','',BT,AT)

    const R2 = instancia.calcularAreaTria()
    document.getElementById("r2").textContent = 'El area del triangulo es:'+R2
}
const boton2 = document.getElementById("btn_calcular2")
boton2.addEventListener("click", mostrar2)