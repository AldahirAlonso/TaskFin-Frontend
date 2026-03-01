import { useEffect, useState } from 'react';

function StarryBackground() {
    const [stars, setStars] = useState<{ id: number, x: number, y: number, size: number, opacity: number, delay: number }[]>([]);

    useEffect(() => {
        // Generar estrellas estáticas con propiedades aleatorias para el efecto de parpadeo
        const generatedStars = Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            opacity: Math.random(),
            delay: Math.random() * 5
        }));
        setStars(generatedStars);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#0B0C10] via-[#1A1A2E] to-[#16213E] overflow-hidden">
            {/* Estrellas estáticas con parpadeo */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        animation: `twinkle ${3 + Math.random() * 4}s infinite ease-in-out alternate`,
                        animationDelay: `${star.delay}s`
                    }}
                />
            ))}

            {/* Estrellas fugaces */}
            <div className="shooting-star-container">
                <div className="shooting-star shooting-star-1"></div>
                <div className="shooting-star shooting-star-2"></div>
                <div className="shooting-star shooting-star-3"></div>
                <div className="shooting-star shooting-star-4"></div>
            </div>
        </div>
    );
}

export default StarryBackground;
