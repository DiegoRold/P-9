// src/components/CommentSection.jsx
import { useState, useEffect } from "react";

export default function CommentSection({ slug }) {
  // Estado para almacenar los comentarios
  const [comments, setComments] = useState([]);

  // Cargar comentarios de localStorage al iniciar
  useEffect(() => {
    const savedComments =
      JSON.parse(localStorage.getItem(`comments-${slug}`)) || [];
    setComments(savedComments);
  }, [slug]);

  // Guardar los comentarios en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem(`comments-${slug}`, JSON.stringify(comments));
  }, [comments]);

  // Manejar el envío de comentarios
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const newComment = event.target.comment.value.trim();
    if (newComment === "") return;

    // Agregar el nuevo comentario a la lista
    setComments([...comments, newComment]);
    event.target.reset();
  };

  return (
    <section className="mt-10 bg-gray-700 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-serif  text-white">Comentarios</h2>

      <form className="mt-4 flex flex-col" onSubmit={handleCommentSubmit}>
        <textarea
          className="w-full p-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="comment"
          rows="3"
          placeholder="Escribe un comentario..."
          required
        ></textarea>
        <button
          type="submit"
          class="mt-4 px-4 py-2 bg-gray-700 text-white font-serif text-sm  shadow-md hover:bg-white transition duration-300"
        >
          Añade tu comentario.
        </button>
      </form>

      {/* Lista de Comentarios en Tiempo Real */}
      <ul className="mt-6 space-y-4">
        {comments.map((comment, index) => (
          <li
            key={index}
            className="p-4 bg-gray-700  shadow-sm border border-gray-200"
          >
            <p className="text-white">{comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
