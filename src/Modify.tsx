import React, { useState } from 'react';
import type { TaskItem } from './App';

interface ModifyProps {
    items: TaskItem[];
    onUpdate: (updatedItem: TaskItem) => void;
}

function Modify({ items, onUpdate }: ModifyProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('Pendiente');
    const [taskStartTime, setTaskStartTime] = useState('');
    const [taskEndTime, setTaskEndTime] = useState('');
    const [taskStartDate, setTaskStartDate] = useState('');
    const [taskEndDate, setTaskEndDate] = useState('');

    const handleSelect = (item: TaskItem) => {
        setSelectedId(item.id);
        setTaskName(item.taskName);
        setTaskDescription(item.taskDescription);
        setTaskStatus(item.taskStatus);
        setTaskStartTime(item.taskStartTime);
        setTaskEndTime(item.taskEndTime);
        setTaskStartDate(item.taskStartDate);
        setTaskEndDate(item.taskEndDate);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedId || !taskName.trim() || !taskDescription.trim()) return;

        onUpdate({
            id: selectedId,
            taskName,
            taskDescription,
            taskStatus,
            taskStartTime,
            taskEndTime,
            taskStartDate,
            taskEndDate
        });

        setSelectedId(null);
        alert('¡Tarea modificada con éxito!');
    };

    return (
        <div className='max-w-6xl mx-auto'>
            <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-800 tracking-tight'>Modificar Tarea</h2>
                <p className='text-gray-500 mt-1'>Selecciona una tarea de la lista para actualizar su información.</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Lista de Selección */}
                <div className='lg:col-span-1 bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden h-full flex flex-col max-h-[700px]'>
                    <h3 className='text-sm font-bold text-gray-800 bg-gray-50 border-b border-gray-100 px-5 py-4'>
                        Tareas Disponibles ({items.length})
                    </h3>
                    <div className='overflow-y-auto flex-1 p-3'>
                        {items.length === 0 ? (
                            <p className='text-gray-500 text-sm p-4 text-center'>No hay tareas para modificar.</p>
                        ) : (
                            <ul className='space-y-2'>
                                {items.map(item => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => handleSelect(item)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm ${selectedId === item.id
                                                    ? 'bg-blue-50 border-blue-200 border text-blue-700 shadow-sm'
                                                    : 'hover:bg-gray-50 border border-transparent text-gray-700 border-b border-gray-100'
                                                }`}
                                        >
                                            <div className='font-bold truncate'>{item.taskName}</div>
                                            <div className='text-xs text-gray-500 mt-1 font-medium'>{item.taskStatus}</div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Formulario de Edición */}
                <div className='lg:col-span-2 bg-gray-50/50 border border-gray-200 shadow-sm rounded-xl p-6 lg:p-8'>
                    {selectedId ? (
                        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                            <h3 className='text-xl font-bold text-gray-800 border-b border-gray-200 pb-3'>Editando Información</h3>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div className='flex flex-col gap-2 md:col-span-2'>
                                    <label className='text-sm font-semibold text-gray-700'>Nombre de la Tarea</label>
                                    <input
                                        value={taskName}
                                        onChange={(e) => setTaskName(e.target.value)}
                                        className='border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg p-2.5 outline-none bg-white transition-all shadow-sm'
                                        type='text' required
                                    />
                                </div>

                                <div className='flex flex-col gap-2 md:col-span-2'>
                                    <label className='text-sm font-semibold text-gray-700'>Descripción</label>
                                    <textarea
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                        className='border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg p-2.5 outline-none bg-white transition-all shadow-sm min-h-[100px] resize-y'
                                        required
                                    />
                                </div>

                                <div className='flex flex-col gap-2 md:col-span-2'>
                                    <label className='text-sm font-semibold text-gray-700'>Estado</label>
                                    <select
                                        value={taskStatus}
                                        onChange={(e) => setTaskStatus(e.target.value)}
                                        className='border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg p-2.5 outline-none bg-white transition-all shadow-sm'
                                        required
                                    >
                                        <option value='Pendiente'>Pendiente</option>
                                        <option value='En Progreso'>En Progreso</option>
                                        <option value='Completado'>Completado</option>
                                    </select>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-700'>Fecha de Inicio</label>
                                    <input
                                        value={taskStartDate}
                                        onChange={(e) => setTaskStartDate(e.target.value)}
                                        className='border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg p-2.5 outline-none bg-white transition-all shadow-sm'
                                        type='date' required
                                    />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-700'>Hora de Inicio</label>
                                    <input
                                        value={taskStartTime}
                                        onChange={(e) => setTaskStartTime(e.target.value)}
                                        className='border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg p-2.5 outline-none bg-white transition-all shadow-sm'
                                        type='time' required
                                    />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-700'>Fecha de Fin</label>
                                    <input
                                        value={taskEndDate}
                                        onChange={(e) => setTaskEndDate(e.target.value)}
                                        className='border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg p-2.5 outline-none bg-white transition-all shadow-sm'
                                        type='date' required
                                    />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-700'>Hora de Fin</label>
                                    <input
                                        value={taskEndTime}
                                        onChange={(e) => setTaskEndTime(e.target.value)}
                                        className='border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg p-2.5 outline-none bg-white transition-all shadow-sm'
                                        type='time' required
                                    />
                                </div>
                            </div>

                            <div className='flex gap-4 mt-4 pt-4 border-t border-gray-200'>
                                <button
                                    type='button'
                                    onClick={() => setSelectedId(null)}
                                    className='flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm'
                                >
                                    Cancelar
                                </button>
                                <button
                                    type='submit'
                                    className='flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg'
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className='h-full flex flex-col items-center justify-center text-center p-12 text-gray-400'>
                            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            <p className='text-lg font-medium text-gray-500'>Selecciona una tarea</p>
                            <p className='text-sm mt-1'>Haz clic en una tarea del panel izquierdo para editar sus detalles.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modify