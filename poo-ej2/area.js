export default class Area{
    Bs;
    Bi;
    A;
    BT;
    AT;
    constructor(Bs,Bi,A,BT,AT){
        this.a = Bs;
        this.b = Bi;
        this.h = A;
        this.bt = BT;
        this.at = AT;
    }
    calcularAreaTrap (){
        const suma = parseInt(this.a)+parseInt(this.b);
        const division = (suma/2)*parseInt(this.h);
        return division.toFixed(2);
    }
    calcularAreaTria (){
        const multi = parseInt(this.bt)*parseInt(this.at);
        const resultado = (multi/2);
        return resultado.toFixed(2);
    }
}
