import React, { useState, useEffect, useRef } from 'react';
import './VinylPlayer.css';

const VinylPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({
        title: '',
        artist: 'add a song to begin',
        color: '#DCC8B8'
    });
    const [isTransitioning, setIsTransitioning] = useState(false);
    const dustContainerRef = useRef(null);

    const audioRef = useRef(new Audio());

    const togglePlay = (e) => {
        e.stopPropagation();
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            if (audioRef.current.src) {
                audioRef.current.play();
            }
        }
        setIsPlaying(!isPlaying);
    };

    const toggleFocus = () => {
        setIsFocused(!isFocused);
    };

    const loadRecord = (e, record) => {
        if (e) e.stopPropagation();
        setIsPlaying(false);
        setIsTransitioning(true);
        audioRef.current.pause();

        setTimeout(() => {
            setCurrentRecord(record);
            audioRef.current.src = record.url;
            setIsTransitioning(false);

            setTimeout(() => {
                setIsPlaying(true);
                audioRef.current.play();
            }, 500);
        }, 300);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        const currentIndex = records.findIndex(r => r.url === currentRecord.url);
        const nextIndex = (currentIndex + 1) % records.length;
        loadRecord(null, records[nextIndex]);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        const currentIndex = records.findIndex(r => r.url === currentRecord.url);
        const prevIndex = (currentIndex - 1 + records.length) % records.length;
        loadRecord(null, records[prevIndex]);
    };

    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => setIsPlaying(false);
        audio.addEventListener('ended', handleEnded);

        const createDust = () => {
            const container = document.body;
            if (!container) return;

            const particle = document.createElement('div');
            particle.classList.add('dust-particle');

            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.opacity = Math.random() * 0.5;

            const duration = Math.random() * 10000 + 5000;
            const animation = particle.animate([
                { transform: 'translateY(0) translateX(0)', opacity: 0 },
                { opacity: 0.5, offset: 0.2 },
                { transform: `translateY(-${Math.random() * 100}px) translateX(${Math.random() * 50 - 25}px)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'linear',
                iterations: 1
            });

            animation.onfinish = () => particle.remove();
            container.appendChild(particle);
        };

        const interval = setInterval(createDust, 500);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            clearInterval(interval);
        };
    }, []);

    const records = [
        {
            title: 'Pink + White',
            artist: 'Frank Ocean',
            color: '#f8d7da',
            url: 'https://qkjmqtvxqpdqnsfubihm.supabase.co/storage/v1/object/public/photos_vday_/Frank%20Ocean%20Pink%20+%20White.mp3',
            gradient: 'linear-gradient(to bottom right, #f8d7da, #e2e2e2)'
        },
        {
            title: 'Marco and Everyone',
            artist: 'Melancholy Echo',
            color: '#d1e7dd',
            url: 'https://qkjmqtvxqpdqnsfubihm.supabase.co/storage/v1/object/public/photos_vday_/Marco%20and%20Everyone.mp3',
            gradient: 'linear-gradient(to bottom right, #d1e7dd, #aebbc2)'
        },
    ];

    return (
        <div className={`vinyl-player-root ${isFocused ? 'focused' : 'mini'}`}>
            <div className="noise-overlay"></div>

            <div className={`app-container ${isFocused ? 'is-focused' : ''}`} onClick={toggleFocus}>
                <section className="turntable-zone">
                    <div className="header-brand">Mansi's vinyl — Vol. 04</div>

                    <div className="turntable-case" data-playing={isPlaying}>
                        <div className="tonearm-assembly">
                            <div className="tonearm-pivot"></div>
                            <div className="tonearm-rod"></div>
                            <div className="tonearm-head"></div>
                        </div>
                        <div className="platter">
                            <div className="active-vinyl">
                                <div className="vinyl-label" style={{ backgroundColor: currentRecord.color }}>
                                    <span id="label-text">Side A</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="controls-overlay">
                        <button className="control-btn" onClick={handlePrev}>
                            <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></svg>
                        </button>
                        <button className="control-btn" onClick={togglePlay}>
                            {isPlaying ? (
                                <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                            ) : (
                                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            )}
                        </button>
                        <button className="control-btn" onClick={handleNext}>
                            <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></svg>
                        </button>
                    </div>

                    <div className="now-playing-text">
                        <h1 className="np-title" style={{ opacity: isTransitioning ? 0 : 1 }}>{currentRecord.title}</h1>
                        <p className="np-artist" style={{ opacity: isTransitioning ? 0 : 0.7 }}>{currentRecord.artist}</p>
                    </div>
                </section>

                <section className="library-zone">
                    <div className="library-header">Collection / Recent Acquisitions</div>
                    <div className="records-grid">
                        {records.map((record, index) => (
                            <div
                                key={index}
                                className="sleeve-container"
                                onClick={(e) => loadRecord(e, record)}
                            >
                                <div className="sleeve-art" style={{ backgroundImage: record.gradient }}>
                                    <div className="sleeve-disc"></div>
                                </div>
                                <div className="sleeve-info">
                                    <div className="sleeve-title">{record.title}</div>
                                    <div className="sleeve-meta">{record.artist}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            {isFocused && (
                <button
                    className="close-focus-btn"
                    onClick={toggleFocus}
                    style={{
                        position: 'fixed',
                        top: '2rem',
                        right: '2rem',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '2rem',
                        cursor: 'pointer',
                        zIndex: 2001,
                        backdropFilter: 'blur(10px)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}
                >
                    Close Player
                </button>
            )}
        </div>
    );
};

export default VinylPlayer;
