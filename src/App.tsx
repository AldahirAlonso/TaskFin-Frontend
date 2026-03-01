import { useState } from 'react'
import Header from './Header'
import './App.css'
import Create from './Create'
import Modify from './Modify'
import Delete from './Delete'
import Show from './Show'
import StarryBackground from './StarryBackground'

export interface TaskItem {
  id: string; // The backend uses Long, but for frontend UUID/Date string generation we keep string temporarily.
  taskName: string;
  taskDescription: string;
  taskStatus: string;
  taskStartTime: string;
  taskEndTime: string;
  taskStartDate: string;
  taskEndDate: string;
}

function App() {
  const [items, setItems] = useState<TaskItem[]>([]);
  const [section, setSection] = useState('Ver');

  // Funciones CRUD
  const addItem = (item: TaskItem) => setItems([...items, item]);
  const updateItem = (updatedItem: TaskItem) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
  };
  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Renderizado condicional del contenido
  const renderContent = () => {
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
          <div className='bg-white/95 shadow-2xl rounded-2xl overflow-hidden border border-white/20'>
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