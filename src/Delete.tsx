import { useState } from 'react';
import type { TaskItem } from './App';

interface DeleteProps {
    items: TaskItem[];
    onDelete: (id: string) => void;
}

function Delete({ items, onDelete }: DeleteProps) {
    const [confirmId, setConfirmId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        onDelete(id);
        setConfirmId(null);
    };

    return (
        <div className='max-w-4xl mx-auto'>
            <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-800 tracking-tight'>Eliminar Tarea</h2>
                <p className='text-gray-500 mt-1'>Selecciona las tareas que deseas remover del sistema de forma permanente.</p>
            </div>

            {items.length === 0 ? (
                <div className='bg-gray-50/50 border border-dashed border-gray-300 rounded-2xl p-12 text-center'>
                    <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </div>
                    <h3 className='text-lg font-semibold text-gray-700'>No hay tareas</h3>
                    <p className='text-gray-500 mt-1 max-w-sm mx-auto'>La lista está vacía. No hay elementos para eliminar actualmente.</p>
                </div>
            ) : (
                <div className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden'>
                    <ul className='divide-y divide-gray-100'>
                        {items.map(item => (
                            <li key={item.id} className='p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors'>
                                <div>
                                    <h3 className='font-bold text-gray-800 text-lg'>{item.name}</h3>
                                    <div className='flex gap-3 text-sm text-gray-500 mt-1'>
                                        <span className='font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded'>{item.status}</span>
                                        <span>{item.startDate} - {item.endDate}</span>
                                    </div>
                                </div>

                                <div className='flex items-center shrink-0'>
                                    {confirmId === item.id ? (
                                        <div className='flex items-center gap-2 bg-red-50 p-2.5 rounded-xl border border-red-100 shadow-sm'>
                                            <span className='text-sm font-bold text-red-700 px-2'>¿Eliminar permanentemente?</span>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className='bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm'
                                            >
                                                Sí, eliminar
                                            </button>
                                            <button
                                                onClick={() => setConfirmId(null)}
                                                className='bg-white border border-gray-300 text-gray-700 text-sm font-bold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors'
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setConfirmId(item.id)}
                                            className='flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-100 font-semibold px-4 py-2.5 rounded-xl transition-all'
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            Eliminar
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Delete