// src/lib/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child, set } from "firebase/database";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-auth-domain",
  databaseURL:
    "https://webcursos-3bbf2-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "tu-project-id",
  storageBucket: "tu-storage-bucket",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id",
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Obtener datos de los posts desde Firebase
export const getPostData = async () => {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "posts/"));
    if (snapshot.exists()) {
      const postsData = snapshot.val();
      // Convertimos el objeto de Firebase en un array de posts
      const postsArray = Object.keys(postsData).map((key) => ({
        id: key, // Usamos la clave como ID
        ...postsData[key], // El resto de los datos del post
      }));
      return postsArray; // Devolvemos el array de posts
    } else {
      console.log("No hay datos disponibles");
      return [];
    }
  } catch (error) {
    console.error("Error al leer los datos de la base de datos:", error);
    return [];
  }
};
export { db };
