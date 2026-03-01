import React from "react";

interface HeaderProps {
  currentSection: string;
  setSection: (section: string) => void;
}

function Sidebar({ currentSection, setSection }: HeaderProps) {

  const navItems = ['Ver', 'Crear', 'Modificar', 'Eliminar'];

  return (
    <header className="w-72 bg-gray-900 border-r border-gray-800 text-white min-h-screen flex flex-col shadow-2xl z-10 shrink-0">
      <div className="p-8 border-b border-gray-800">
        <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight">
          TaskFin
        </h2>
        <p className="text-gray-400 text-sm mt-1">Gestor de Tareas</p>
      </div>

      <nav className="flex flex-col gap-2 p-4 mt-4 flex-1">
        {navItems.map(item => (
          <button
            key={item}
            onClick={() => setSection(item)}
            className={`text-left px-5 py-3 rounded-xl transition-all duration-200 font-medium ${currentSection === item
              ? 'bg-blue-600/20 text-blue-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-blue-500/30'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
              }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold shadow-lg">
            AH
          </div>
          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-gray-500">Sistema</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Sidebar;