import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target;
            const isClickable = window.getComputedStyle(target).cursor === 'pointer';
            setIsPointer(isClickable);
        };

        const handleClick = (e) => {
            const newHearts = Array.from({ length: 8 }).map((_, i) => ({
                id: Math.random(),
                x: e.clientX,
                y: e.clientY,
                angle: (i / 8) * Math.PI * 2 + (Math.random() * 0.5),
                velocity: 2 + Math.random() * 3,
                size: 8 + Math.random() * 12
            }));

            setHearts(prev => [...prev.slice(-20), ...newHearts]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleClick);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleClick);
        };
    }, []);

    useEffect(() => {
        if (hearts.length > 0) {
            const timer = setTimeout(() => {
                setHearts(prev => prev.slice(8));
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [hearts.length]);

    return (
        <>
            <div
                className="custom-cursor"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 0.8})`,
                }}
            >
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                        fill="#D14D28"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                </svg>
            </div>
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="explosion-heart"
                    style={{
                        left: `${heart.x}px`,
                        top: `${heart.y}px`,
                        '--angle': heart.angle,
                        '--velocity': heart.velocity,
                        width: `${heart.size}px`,
                        height: `${heart.size}px`,
                    }}
                >
                    <svg viewBox="0 0 24 24">
                        <path
                            fill="#D14D28"
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                    </svg>
                </div>
            ))}
        </>
    );
};

export default CustomCursor;
