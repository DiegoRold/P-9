import React, { useEffect, useRef } from "react";

const Slider = () => {
  const courses = [
    { id: 0, image: "/espanola.jpg" },
    { id: 1, image: "/italiana.jpg" },
    { id: 2, image: "/japonesa.jpg" },
    { id: 3, image: "/peruana.jpg" },
    { id: 4, image: "/mexicana.jpg" },
    { id: 5, image: "/francesa.jpg" },
    { id: 6, image: "/alemana.jpg" },
    { id: 7, image: "/brasilena.jpg" },
  ];

  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const slider = sliderRef.current;
      if (slider) {
        const firstImageWidth = slider.children[0].offsetWidth;
        slider.scrollLeft += firstImageWidth;

        // Si llegamos al final, volvemos al principio (ciclo infinito)
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
    }, 3000); // Desplazamiento cada 3 segundos

    return () => clearInterval(interval); // Limpiar intervalo cuando el componente se desmonte
  }, []);

  return (
    <div className="mt-10 w-full overflow-hidden bg-white py-8">
      <div
        ref={sliderRef}
        className="container mx-auto flex space-x-6 overflow-hidden no-scrollbar scroll-smooth"
        style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
      >
        {/* Renderizamos las imágenes y luego las duplicamos para crear el efecto de ciclo */}
        {courses.concat(courses).map((course, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-96 rounded-xl shadow-2xl bg-white transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={course.image}
              alt={`Course ${course.id}`}
              className="w-full h-64 object-cover rounded-xl transition-all duration-500 ease-in-out hover:opacity-90"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
