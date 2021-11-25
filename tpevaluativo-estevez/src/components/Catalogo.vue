<template >
        <div class="row">
            <template v-for="catalogoAdmin of lista_productos" v-bind:key="catalogoAdmin.id">
                <div v-if="catalogoAdmin.estadosele == 1" class="col-3">
                    <div class="card">
                    <img :src="catalogoAdmin.url" class="card-img-top" style="height:12rem" alt="">
                    <div class="card-body">
                        <h5 class="card-title">Producto</h5>
                        <p class="card-text">{{catalogoAdmin.descripcion}}</p>
                        <p class="card-text" v-if="catalogoAdmin.descuento > 
                            0">${{(catalogoAdmin.precio-(catalogoAdmin.descuento*catalogoAdmin.precio)/100)}}
                            <del class="descuento">(${{catalogoAdmin.precio}}</del>)
                        </p>
                        <p class="card-text" v-else>${{catalogoAdmin.precio}}</p>
                        <p class="card-text">
                            <template v-if="catalogoAdmin.estadosele == 1">
                               Disponible
                            </template>
                        </p>
                        <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                </div>
            </div>
            </template>
    </div>
</template>

<script>
import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc } from '@firebase/firestore'
import { uploadBytes, ref, getDownloadURL} from '@firebase/storage'
import{db, storage} from '../utils/firebase.js'
export default {
    name:'Catalogo',
    data(){
        return{
            lista_productos:[],
        }   
    },
    methods:{
        async subir_imagen()
        {
            const file = document.getElementById("inp_file").files[0]
            /* vamos a indicar en que lugar vamos a guardar la imagen */
            const config = ref (storage,'producto_imagenes/'+file.name)
            await uploadBytes (config, file).then( ()=>{
                alert("operacion exitosa")
                document.getElementById("inp_file").value = ''
                })
                this.url = await getDownloadURL(config)
        },
        vaciar(){
                this.descripcion = '';
                this.precio = null;
                this.descuento = null;
                this.categoria = '';
                this.stock = null;
                this.url=null
                this.estado=null;
                this.estadosele=null;
        },
        async mostrar(){
            await this.subir_imagen()
            const objetoProducto = {
                descripcion: this.descripcion,
                precio: this.precio,
                descuento: this.descuento,
                categoria: this.categoria,
                stock: this.stock,
                estadosele: this.estadosele,
                estado: this.estado,
                url:this.url

            }
            const coleccion = collection(db,'catalogoAdmin')
            addDoc(coleccion,objetoProducto)
                this.vaciar()
        },
        obtener_productos()
        {
    /* se hace una captura de collecction */
            onSnapshot( collection(db,'catalogoAdmin'),(snapshot)=>{
                this.lista_productos=[]
                snapshot.docs.map((doc)=>{
                    this.lista_productos.push({...doc.data(),id:doc.id})
                })
            })
        },
        eliminar_producto(id){
            /* para aliminar, necesito acceso a la base (db) y esècificar la colleccion y el ID */
            deleteDoc(doc(db,'catalogoAdmin',id))
        
    },
    editar_producto(catalogoAdmin)
    {
        /* id no utiliza el V-model */
        this.id= catalogoAdmin.id;
        this.descripcion=catalogoAdmin.descripcion;
        this.precio=catalogoAdmin.precio;
        this.descuento=catalogoAdmin.descuento;
        this.categoria=catalogoAdmin.categoria;
        this.stock=catalogoAdmin.stock;
        this.url=catalogoAdmin.url;
        this.estadosele=1;
        this.estado=1
    },
    actualizar_producto(){
        const productoModificado ={
            descripcion: this.descripcion,
            precio: this.precio,
            descuento: this.descuento,
            categoria: this.categoria,
            stock: this.stock,
            url: this.url,
            estadosele: this.estadosele,
            estado: this.estado
        }
        updateDoc( doc(db,'catalogoAdmin', this.id), productoModificado)
            this.estado=0;
            this.vaciar()
    }
},
mounted(){
    this.obtener_productos()
}
}

</script>
