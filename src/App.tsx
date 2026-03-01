import { useState, useEffect } from 'react'
import Header from './Header'
import './App.css'
import Create from './Create'
import Modify from './Modify'
import Delete from './Delete'
import Show from './Show'
import StarryBackground from './StarryBackground'

export interface TaskItem {
  id: string; // The backend uses Long, keeping string on frontend for compatibility with existing components
  name: string;
  description: string;
  status: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
}

const API_URL = 'http://localhost:8080';

function App() {
  const [items, setItems] = useState<TaskItem[]>([]);
  const [section, setSection] = useState('Ver');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar Tareas al Iniciar (GET)
  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) throw new Error('Error al conectar con el servidor');
      const data = await response.json();

      // Asegurar que los IDs sean strings para el frontend
      const formattedData = data.map((item: any) => ({
        ...item,
        id: item.id.toString()
      }));
      setItems(formattedData);
    } catch (err: any) {
      setError(err.message || 'No se pudo conectar con el backend (Asegúrate de que tu Spring Boot está corriendo en el puerto 8080 y tiene configurado @CrossOrigin).');
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Funciones CRUD con conexión al Backend
  const addItem = async (item: TaskItem) => {
    try {
      // Remover el id autogenerado por el frontend para que la base de datos MySQL provea uno real
      const { id, ...taskDataToSave } = item;

      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskDataToSave)
      });

      if (!response.ok) throw new Error('Error al guardar la tarea');

      // Refrescar lista después de agregar exitosamente
      await fetchTasks();

    } catch (err) {
      console.error(err);
      alert('Hubo un error al guardar. Asegúrate que el backend está corriendo.');
    }
  };

  const updateItem = async (updatedItem: TaskItem) => {
    try {
      const response = await fetch(`${API_URL}/${updatedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem)
      });

      if (!response.ok) throw new Error('Error al actualizar la tarea');

      // Actualizamos estado localmente en vez de hacer refetch para que la UI se sienta más rápida
      setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));

    } catch (err) {
      console.error(err);
      alert('Hubo un error al actualizar. Asegúrate que el backend está conectado.');
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar la tarea');

      // Actualizamos el front end
      setItems(items.filter(item => item.id !== id));

    } catch (err) {
      console.error(err);
      alert('Hubo un error al eliminar.');
    }
  };

  // Renderizado condicional
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium tracking-wide animate-pulse">Conectando con el servidor...</p>
        </div>
      );
    }

    if (error && items.length === 0) {
      return (
        <div className="flex flex-col flex-1 min-h-[400px]">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-2xl mx-auto my-auto text-center">
            <svg className="w-16 h-16 text-red-500 mx-auto w-full mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="text-xl font-bold text-red-800 mb-2">Problema de Conexión</h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchTasks}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-6 rounded-xl shadow-sm transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    switch (section) {
      case 'Crear': return <Create onAdd={addItem} />;
      case 'Ver': return <Show items={items} />;
      case 'Modificar': return <Modify items={items} onUpdate={updateItem} />;
      case 'Eliminar': return <Delete items={items} onDelete={deleteItem} />;
      default: return <Show items={items} />;
    }
  };

  return (
    <div className='flex min-h-screen text-gray-800 font-sans relative'>
      <StarryBackground />
      <Header currentSection={section} setSection={setSection} />

      <main className='flex-1 p-10 overflow-y-auto w-full z-10'>
        <div className='max-w-6xl mx-auto backdrop-blur-sm'>
          <div className='bg-white/95 shadow-2xl rounded-2xl overflow-hidden border border-white/20 relative'>

            {error && items.length > 0 && (
              <div className="absolute top-0 w-full z-50 bg-red-500 text-white px-8 py-3 text-sm font-medium flex justify-between items-center shadow-md animate-pulse">
                <span>⚠️ {error}</span>
                <button onClick={fetchTasks} className="underline hover:text-red-100 font-bold">Reintentar</button>
              </div>
            )}

            <div className='bg-gradient-to-r from-blue-700/90 to-indigo-800/90 backdrop-blur-md px-8 py-10 text-white'>
              <h1 className='text-4xl font-extrabold tracking-tight'>Panel de Tareas</h1>
              <p className='mt-2 text-indigo-100 text-lg'>Administra tus actividades y tiempos desde un solo lugar</p>
            </div>

            <div className='p-8 min-h-[500px] bg-white/90'>
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App