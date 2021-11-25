import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyDZ8KkTTzb6vjWAiTCZKthKn0xuUsQ1RYA",
    authDomain: "pp1-cet30-ve.firebaseapp.com",
    projectId: "pp1-cet30-ve",
    storageBucket: "pp1-cet30-ve.appspot.com",
    messagingSenderId: "492458820087",
    appId: "1:492458820087:web:d3691ba520779be06d6ef2",
    measurementId: "G-8BF8DRGTD0"
  };
  //Iniciamos la conexion entre nuetra app y firebase 
  const conexion = initializeApp(firebaseConfig)
  //Me conecto con el servicio de datos de firestore
  const db = getFirestore()
  const storage = getStorage(conexion)
  const auth = getAuth()
  export {db, storage, auth}