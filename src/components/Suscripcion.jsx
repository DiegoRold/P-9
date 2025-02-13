// Suscripcion.jsx

import React, { useState, useEffect } from "react";

const Suscripcion = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");

  // Usar localStorage para verificar usuarios y sesiones
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(storedUsers);

    const sesion = JSON.parse(localStorage.getItem("sesion"));
    if (sesion) {
      setShowModal(false); // Si ya hay una sesión activa, no mostrar el modal
    }
  }, []);

  // Registrar un nuevo usuario
  const registrarUsuario = () => {
    if (!usuario.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    const usuarioExistente = usuarios.find(user => user.usuario === usuario);
    if (usuarioExistente) {
      setError("El usuario ya está registrado.");
      return;
    }

    const nuevosUsuarios = [...usuarios, { usuario, password }];
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    setUsuarios(nuevosUsuarios);
    setError("¡Usuario registrado exitosamente!");
    setUsuario("");
    setPassword("");
  };

  // Iniciar sesión con los datos del usuario
  const iniciarSesion = () => {
    const storedUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = storedUsers.find(
      user => user.usuario === usuario && user.password === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem("sesion", JSON.stringify({ usuario }));
      setShowModal(false); // Si el inicio de sesión es correcto, ocultar el modal
      setError("");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  // Si la sesión está activa, no mostrar el formulario
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Iniciar sesión o Registrarse</h2>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        {/* Input de usuario */}
        <input
          type="text"
          placeholder="Nombre de usuario"
          className="w-full p-2 border rounded mb-2"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        {/* Input de contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Botones */}
        <div className="flex justify-between">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-1/2 mr-2"
            onClick={registrarUsuario}
          >
            Registrarse
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-1/2"
            onClick={iniciarSesion}
            disabled={usuarios.length === 0} // Desactiva el botón si no hay usuarios registrados
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Suscripcion;
