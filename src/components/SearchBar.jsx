import React, { useState, useEffect } from "react";
import { getPostData } from "../lib/firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsFromFirebase = await getPostData();
      console.log(postsFromFirebase); // Agregar esto para ver qué datos estamos obteniendo
      if (postsFromFirebase) {
        const postsArray = Object.values(postsFromFirebase);
        setPosts(postsArray);
      }
    };
    fetchPosts();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePostClick = (post) => {
    console.log(post); // Verificar qué post estamos seleccionando
    setSelectedPost(post); // Guardamos la publicación seleccionada
    window.location.href = `/blog/${post.slug}`; // Redirigimos a la página de la publicación
    setIsDialogOpen(false); // Cerramos el modal
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPost(null);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  // Filtrar los posts según el término de búsqueda (asegurándonos de que no haya espacios extra)
  const filteredPosts = posts.filter(
    (post) =>
      post.title &&
      post.title.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="">
      {/* Botón para abrir el diálogo */}
      <button
        onClick={handleOpenDialog}
        className="inline-block px-6 py-3 text-lg font-serif text-white transition-all duration-300 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#000000"
          height="28px"
          width="28px"
          rotate={32}
          version="1.1"
          id="Capa_1"
          viewBox="0 0 183.792 183.792"
          xml:space="preserve"
        >
          <path d="M54.734,9.053C39.12,18.067,27.95,32.624,23.284,50.039c-4.667,17.415-2.271,35.606,6.743,51.22  c12.023,20.823,34.441,33.759,58.508,33.759c7.599,0,15.139-1.308,22.287-3.818l30.364,52.592l21.65-12.5l-30.359-52.583  c10.255-8.774,17.638-20.411,21.207-33.73c4.666-17.415,2.27-35.605-6.744-51.22C134.918,12.936,112.499,0,88.433,0  C76.645,0,64.992,3.13,54.734,9.053z M125.29,46.259c5.676,9.831,7.184,21.285,4.246,32.25c-2.938,10.965-9.971,20.13-19.802,25.806  c-6.462,3.731-13.793,5.703-21.199,5.703c-15.163,0-29.286-8.146-36.857-21.259c-5.676-9.831-7.184-21.284-4.245-32.25  c2.938-10.965,9.971-20.13,19.802-25.807C73.696,26.972,81.027,25,88.433,25C103.597,25,117.719,33.146,125.29,46.259z" />
        </svg>
      </button>

      {/* Dialog que se abre con el botón */}
      {isDialogOpen && (
        <dialog
          open
          className="bg-gray-700 p-6 rounded-lg shadow-xl max-w-lg w-full"
        >
          <h2 className="text-2xl font-Akira text-white mb-4">Cursos</h2>

          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Encuentra tu curso"
            value={searchTerm}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 mb-4"
          />

          {/* Mostrar lista de resultados filtrados */}
          <ul className="space-y-2">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <li
                  key={post.id} // Asegúrate de que 'post.id' sea único para cada post
                  onClick={() => handlePostClick(post)} // Cuando se hace clic en un post, actualizamos el estado
                  className="cursor-pointer text-lg font-serif text-white hover:text-cyan-500 hover:underline transition-all duration-300 transform hover:scale-105"
                >
                  {post.title}
                </li>
              ))
            ) : (
              <li className="text-lg font-medium text-red-500">
                No se encontraron resultados
              </li>
            )}
          </ul>

          {/* Mostrar el modal con información del post seleccionado */}
          {selectedPost && (
            <div className="mt-4 bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-semibold">{selectedPost.title}</h3>
              <p>{selectedPost.description}</p>
            </div>
          )}

          {/* Botón para cerrar el diálogo */}
          <button
            onClick={handleCloseDialog}
            className="mt-4 bg-slate-700 text-slate-800 px-4 py-2 font-bold rounded-lg shadow-md hover:bg-gray-900 transition-all ml-auto"
          >
            ❌
          </button>
        </dialog>
      )}
    </div>
  );
};

export default SearchBar;
