import type { TaskItem } from './App';

interface ShowProps {
    items: TaskItem[];
}

function Show({ items }: ShowProps) {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'En Progreso': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Completado': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div>
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800 tracking-tight'>Mis Tareas</h2>
                    <p className='text-gray-500 mt-1'>
                        {items.length === 0
                            ? 'No hay tareas registradas aún. Ve a "Crear" para añadir una.'
                            : `Viendo ${items.length} tarea(s) registrada(s).`}
                    </p>
                </div>
            </div>

            {items.length === 0 ? (
                <div className='bg-gray-50/50 border border-dashed border-gray-300 rounded-2xl p-12 text-center'>
                    <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <span className='text-3xl'>📋</span>
                    </div>
                    <h3 className='text-lg font-semibold text-gray-700'>Lista Vacía</h3>
                    <p className='text-gray-500 mt-1 max-w-sm mx-auto'>No se han encontrado tareas. Comienza agregando tu primera actividad.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {items.map((item) => (
                        <div key={item.id} className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl p-5 group flex flex-col h-full'>
                            <div className='flex items-start justify-between mb-3 gap-2'>
                                <h3 className='text-lg font-bold text-gray-800 leading-tight' title={item.taskName}>{item.taskName}</h3>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border whitespace-nowrap ${getStatusColor(item.taskStatus)}`}>
                                    {item.taskStatus}
                                </span>
                            </div>

                            <p className='text-gray-600 text-sm leading-relaxed mb-4 flex-1' title={item.taskDescription}>
                                {item.taskDescription}
                            </p>

                            <div className='border-t border-gray-100 pt-4 mt-auto grid grid-cols-2 gap-x-2 gap-y-3 text-xs text-gray-500'>
                                <div>
                                    <p className='font-semibold text-gray-700 mb-0.5'>Inicio</p>
                                    <p>{item.taskStartDate} {item.taskStartTime}</p>
                                </div>
                                <div>
                                    <p className='font-semibold text-gray-700 mb-0.5'>Fin</p>
                                    <p>{item.taskEndDate} {item.taskEndTime}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Show