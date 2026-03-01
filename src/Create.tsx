import React, { useState } from 'react';
import type { TaskItem } from './App';

interface CreateProps {
    onAdd: (item: TaskItem) => void;
}

function Create({ onAdd }: CreateProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pendiente');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) return;

        const newItem: TaskItem = {
            id: Date.now().toString(),
            name,
            description,
            status,
            startTime,
            endTime,
            startDate,
            endDate
        };

        onAdd(newItem);
        setName('');
        setDescription('');
        setStatus('Pendiente');
        setStartTime('');
        setEndTime('');
        setStartDate('');
        setEndDate('');

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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-lg p-3 outline-none transition-all bg-white'
                            type='text' placeholder='Ej. Realizar reporte trimestral' required
                        />
                    </div>

                    <div className='flex flex-col gap-2 md:col-span-2'>
                        <label className='text-sm font-semibold text-gray-700'>Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-lg p-3 outline-none transition-all min-h-[100px] resize-y bg-white'
                            placeholder='Detalles de la tarea...' required
                        />
                    </div>

                    <div className='flex flex-col gap-2 md:col-span-2'>
                        <label className='text-sm font-semibold text-gray-700'>Estado</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
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
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className='border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-lg p-3 outline-none transition-all bg-white'
                            type='date' required
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700'>Hora de Inicio</label>
                        <input
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className='border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-lg p-3 outline-none transition-all bg-white'
                            type='time' required
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700'>Fecha de Fin</label>
                        <input
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className='border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-lg p-3 outline-none transition-all bg-white'
                            type='date' required
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700'>Hora de Fin</label>
                        <input
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
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