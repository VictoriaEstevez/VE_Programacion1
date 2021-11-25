<template>
     <h3>{{titulo}}</h3>
    <div class="row">
        <div class="col-4">
            <div class="mb-3">
                <label for="form-label">Descripcion</label>
                <input v-model="descripcion" class="form-control" placeholder="Ingrese Descripcion" type="text">
            </div>
             <div class="mb-3">
              <label for="form-label">Precio</label>
              <input v-model="precio" class="form-control" placeholder="Ingrese Precio" type="number">
            </div>
            <div class="mb-3">
              <label for="form-label">Porcentaje de descuento</label>
              <input v-model="descuento" class="form-control" placeholder="Ingrese Descuento" type="number">
            </div>
             <div class="mb-3">
              <label for="form-label">Categoria</label>
              <input v-model="categoria" class="form-control" placeholder="Ingrese Categoria" type="text">
            </div>
            <div class="mb-3">
              <label for="form-label">Stock</label>
              <input v-model="stock" class="form-control" placeholder="Ingrese Stock" type="number">
            </div>
            <div class="mb-3">
                <label for="form-label">Estado</label>
                <select v-model="estadosele" class="form-select" aria-label="Default select example">
                    <option value="0">Inactivo</option>
                    <option value="1">Activo</option>
                </select>
            </div>
            <div class= "mb-3">
                <label for="form-label">Adjuntar Imagen</label>
                <input id="inp_file" type="file" class="form-control" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
            </div>
        </div>
        <div class="col-8">
            <table class="table">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>% Descuento</th>
                        <th>Categoria</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="catalogoAdmin of lista_productos" v-bind:key="catalogoAdmin.id">
                        <td><img style="width:3rem" :src="catalogoAdmin.url" alt=""></td>
                        <td>{{catalogoAdmin.descripcion}}</td>
                        <td>{{catalogoAdmin.precio}}</td>
                        <td>{{catalogoAdmin.descuento}}</td>
                        <td>{{catalogoAdmin.categoria}}</td>
                        <td>{{catalogoAdmin.stock}}</td> 
                        <td>
                            <template v-if="catalogoAdmin.estadosele == 0">
                                Inactivo
                            </template>
                            <template v-else>
                                Activo
                            </template>
                        </td>
                        <td>
                            <button @click="eliminar_producto(catalogoAdmin.id)" class="btn btn-danger btn-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
                            </button>
                            <button @click="editar_producto(catalogoAdmin)" class="btn btn-primary btn-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <button v-if="estado == 0" @click="guardar_producto()" class="btn btn-outline-primary">Guardar</button>
    <button v-if="estado == 1" @click="actualizar_producto()" class="btn btn-outline-primary">Actualizar</button>
</template>
<script>
import {addDoc,collection, onSnapshot, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import {uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import {db, storage} from '../utils/firebase.js'
export default {
    name:'CatalogoAdminForm',
    data(){
        return{
            descripcion:'',
            precio:null,
            descuento:null,
            categoria:'',
            stock:null,
            lista_productos:[],
            id:null,
            url:null,
            estadosele:0,
            estado:0
            
        }
    },
       methods:{
        async subir_imagen(){
            const file = document.getElementById("inp_file").files[0]
            //Vamos a guardar nuestra imagen 
            const config = ref(storage,'imagenes/'+file.name)
            await uploadBytes(config, file).then(()=>{
                alert('Operacion exitosa!')
                document.getElementById("inp_file").value=''
            })
            this.url = await getDownloadURL(config)
        },
        vaciar(){
            this.descripcion = '';
            this.precio = null;
            this.descuento = null;
            this.categoria = '';
            this.stock = null;
            this.estadosele=null;
            this.url=null;
        },
        async guardar_producto(){
            await this.subir_imagen()
            const objetoProducto = {
                descripcion: this.descripcion,
                precio: this.precio,
                descuento: this.descuento,
                categoria: this.categoria,
                stock: this.stock,
                estadosele:this.estadosele,
                url:this.url
            }
            const coleccion = collection(db,'catalogoAdmin')
            addDoc(coleccion,objetoProducto)
           this.vaciar()
        },
        obtener_productos(){
            onSnapshot (collection(db,'catalogoAdmin'), (snapshot)=>{
                this.lista_productos = []
                snapshot.docs.map((doc)=>{
                    this.lista_productos.push({...doc.data(),id:doc.id})
                })
            })
        },
        eliminar_producto(id){
            deleteDoc(doc(db,'catalogoAdmin',id))
        },
        editar_producto(catalogoAdmin){
            this.descripcion = catalogoAdmin.descripcion;
            this.precio = catalogoAdmin.precio;
            this.descuento= catalogoAdmin.descuento;
            this.categoria= catalogoAdmin.categoria;
            this.stock = catalogoAdmin.stock;
            this.estadosele=catalogoAdmin.estadosele;
            //El atributo no se usa como v-model
            this.id = catalogoAdmin.id;
            this.url=catalogoAdmin.url;
            this.estado=1;
        },
        async actualizar_producto(){
             await this.subir_imagen()
            const productoModificado = {
                descripcion:this.descripcion,
                precio:this.precio,
                descuento:this.descuento,
                categoria:this.categoria,
                stock:this.stock,
                estadosele:this.estadosele,
                url:this.url
            }
            updateDoc(doc(db,'catalogoAdmin',this.id),productoModificado)
            this.estado=0;
            this.vaciar()
        },
    },

     mounted(){
        this.obtener_productos()
    }
}
</script>