import React, { useState } from 'react';
import type { TaskItem } from './App';

interface CreateProps {
    onAdd: (item: TaskItem) => void;
}

function Create({ onAdd }: CreateProps) {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('Pendiente');
    const [taskStartTime, setTaskStartTime] = useState('');
    const [taskEndTime, setTaskEndTime] = useState('');
    const [taskStartDate, setTaskStartDate] = useState('');
    const [taskEndDate, setTaskEndDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskName.trim() || !taskDescription.trim()) return;

        const newItem: TaskItem = {
            id: Date.now().toString(),
            taskName,
            taskDescription,
            taskStatus,
            taskStartTime,
            taskEndTime,
            taskStartDate,
            taskEndDate
        };

        onAdd(newItem);
        setTaskName('');
        setTaskDescription('');
        setTaskStatus('Pendiente');
        setTaskStartTime('');
        setTaskEndTime('');
        setTaskStartDate('');
        setTaskEndDate('');

        alert('¡Tarea creada con éxito!');
    };

    return (
        <div className='max-w-3xl mx-auto'>
            <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-800 tracking-tight'>Crear Nueva Tarea</h2>
                <p className='text-gray-500 mt-1'>Llena los datos a continuación para registrar una nueva tarea en el sistema.</p>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-6 bg-gray-50/50 p-6 rounded-xl border border-gray-100'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2 md:col-span-2'>
                        <label className='text-sm font-semibold text-gray-700'>Nombre de la Tarea</label>
                        <input
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className='border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-lg p-3 outline-none transition-all bg-white'
                            type='text' placeholder='Ej. Realizar reporte trimestral' required
                        />
                    </div>

                    <div className='flex flex-col gap-2 md:col-span-2'>
                        <label className='text-sm font-semibold text-gray-700'>Descripción</label>
                        <textarea
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className='border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-lg p-3 outline-none transition-all min-h-[100px] resize-y bg-white'
                            placeholder='Detalles de la tarea...' required
                        />
                    </div>

                    <div className='flex flex-col gap-2 md:col-span-2'>
                        <label className='text-sm font-semibold text-gray-700'>Estado</label>
                        <select
                            value={taskStatus}
                            onChange={(e) => setTaskStatus(e.target.value)}
                            className='border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-lg p-3 outline-none transition-all bg-white'
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
                            className='border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-lg p-3 outline-none transition-all bg-white'
                            type='date' required
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700'>Hora de Inicio</label>
                        <input
                            value={taskStartTime}
                            onChange={(e) => setTaskStartTime(e.target.value)}
                            className='border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-lg p-3 outline-none transition-all bg-white'
                            type='time' required
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700'>Fecha de Fin</label>
                        <input
                            value={taskEndDate}
                            onChange={(e) => setTaskEndDate(e.target.value)}
                            className='border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-lg p-3 outline-none transition-all bg-white'
                            type='date' required
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700'>Hora de Fin</label>
                        <input
                            value={taskEndTime}
                            onChange={(e) => setTaskEndTime(e.target.value)}
                            className='border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-lg p-3 outline-none transition-all bg-white'
                            type='time' required
                        />
                    </div>
                </div>

                <button
                    className='mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium p-3.5 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-[0.98]'
                    type='submit'
                >
                    Guardar Tarea
                </button>
            </form>
        </div>
    )
}

export default Create