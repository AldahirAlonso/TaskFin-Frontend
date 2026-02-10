import React from "react";

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-500 text-white h-screen p-10">
      <h2 className="text-2xl font-bold mb-8">TaskFin</h2>

      <nav className="flex flex-col gap-5">
        <a href="#" className="hover:text-blue-400">Ver</a>
        <a href="#" className="hover:text-blue-400">Crear</a>
        <a href="#" className="hover:text-blue-400">Modificar</a>
        <a href="#" className="hover:text-blue-400">Eliminar</a>
      </nav>
    </aside>
  );
}

export default Sidebar;