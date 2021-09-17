 export default class anime {
    constructor(){}
        async obtenerCatalogo(){
            const datos = await fetch("https://api.jikan.moe/v3/search/anime?q=higurashi%20no%20naku%20koro%20ni") 
            //especificamos que los datos estan llegando en formato JSON
            const datos_convertidos = await datos.json()
            const datos_definitivos = datos_convertidos.results
            let array_catalogo = []
            datos_definitivos.forEach(element => {
                 let columna = `
                 <div class="col-4 mt-3">
                    <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${element.image_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${element.title}</h5>
                                <p class="card-text">${element.synopsis}</p>
                                <p class="card-text"><small class="text-muted">Episodio: ${element.episodes}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
                array_catalogo.push(columna)
            });
            document.getElementById("catalogo").innerHTML = array_catalogo.join(``)
    }
}