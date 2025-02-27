import React, { useState, useEffect } from "react";

const Registro = ({ onLogin }) => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false); // Controla si es inicio de sesión o registro
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    if (sesion) {
      // Si hay una sesión, no necesitamos mostrar el modal.
      setShowModal(false);
    }
  }, []);

  const handleRegistro = () => {
    if (
      !nombre.trim() ||
      !apellidos.trim() ||
      !usuario.trim() ||
      !password.trim()
    ) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioExistente = usuarios.find((u) => u.usuario === usuario);

    if (usuarioExistente) {
      setError("Este nombre de usuario ya está registrado.");
      return;
    }

    const nuevoUsuario = { nombre, apellidos, usuario, password };
    localStorage.setItem(
      "usuarios",
      JSON.stringify([...usuarios, nuevoUsuario])
    );
    localStorage.setItem("sesion", JSON.stringify({ usuario })); // Inicia sesión automáticamente
    setError("");
    setShowModal(false); // Cierra el modal
    onLogin(usuario); // Llama a la función onLogin
  };

  const handleInicioSesion = () => {
    if (!usuario.trim() || !password.trim()) {
      setError("Por favor, introduce usuario y contraseña.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === usuario && u.password === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem("sesion", JSON.stringify({ usuario }));
      setError("");
      setShowModal(false); // Cierra el modal
      onLogin(usuario); // Llama a la función onLogin
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setError(""); // Limpia errores al cerrar/abrir
  };

  const closeModal = () => {
    setShowModal(false);
    setError(""); // Limpia errores al cerrar
  };

  return (
    <>
      {/* Icono de Registro (se añade en Header.astro) */}
      <button onClick={toggleModal} className="ml-4 md:ml-10 icon-link">
        <img
          src="/registro.png"
          alt="Registro"
          className="icon text-slate-100 hover:text-amber-400 transition duration-300 w-8 h-8"
        />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </h2>
            {error && (
              <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
            )}

            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full p-2 border rounded mb-2"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Apellidos"
                  className="w-full p-2 border rounded mb-2"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                />
              </>
            )}
            <input
              type="text"
              placeholder="Usuario"
              className="w-full p-2 border rounded mb-2"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-2 border rounded mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-between">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded w-1/2 mr-2"
                onClick={isLogin ? handleInicioSesion : handleRegistro}
              >
                {isLogin ? "Iniciar Sesión" : "Registrarse"}
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded w-1/2"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Crear Cuenta" : "Ya tengo cuenta"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Registro;
