import React, { useState, useEffect } from 'react';
import Page from './Page';
import AsciiHeart from './AsciiHeart';

const Book = () => {
    const [flippedPages, setFlippedPages] = useState({});

    const getSupabaseUrl = (name) =>
        `https://qkjmqtvxqpdqnsfubihm.supabase.co/storage/v1/object/public/photos_vday_/${name}`;

    const photoPairs = [
        {
            title: 'Quiet',
            desc: 'Morning Light',
            front: [getSupabaseUrl('IMG_9483.jpg')],
            back: [getSupabaseUrl('IMG_9494.jpg'), getSupabaseUrl('IMG_9559.JPG')]
        },
        {
            title: 'our first trip!',
            desc: 'Hour Glass',
            front: [getSupabaseUrl('IMG_2498.JPG')],
            back: [getSupabaseUrl('IMG_2635.JPG'), getSupabaseUrl('IMG_2636.JPG')]
        },
        {
            title: 'Walks',
            desc: 'City Rhythm',
            front: [getSupabaseUrl('IMG_3135.JPG')],
            back: [getSupabaseUrl('IMG_3411.JPG'), getSupabaseUrl('IMG_3421.JPG')]
        },
        {
            title: 'Sway',
            desc: 'Nature Calls',
            front: [getSupabaseUrl('IMG_3639.JPG')],
            back: [getSupabaseUrl('IMG_9058.PNG')]
        },
        {
            title: 'Still',
            desc: 'Silent Bloom',
            front: [getSupabaseUrl('IMG_2637.JPG'), getSupabaseUrl('IMG_2638.JPG')],
            back: [getSupabaseUrl('IMG_3282.JPG')]
        }
    ];

    const interleavedPages = [
        { type: 'photo', data: photoPairs[0] }, // Page 2
        { type: 'ascii', variant: 'heart', title: 'tb to innocent mansii' },    // Page 3
        { type: 'photo', data: photoPairs[1] }, // Page 4
        { type: 'photo', data: photoPairs[2] }, // Page 5
        { type: 'photo', data: photoPairs[3] }, // Page 6
        { type: 'photo', data: photoPairs[4] }, // Page 7
    ];

    const maxPages = 2 + interleavedPages.length;

    const handleFlip = (pageNum) => {
        setFlippedPages(prev => ({
            ...prev,
            [pageNum]: !prev[pageNum]
        }));
    };

    const isBookOpen = Object.values(flippedPages).some(val => val);

    useEffect(() => {
        if (isBookOpen) {
            document.body.classList.add('book-open');
        } else {
            document.body.classList.remove('book-open');
        }
    }, [isBookOpen]);

    const renderGraphicPage = (imageList, title, desc, memoryNum, isRed = false) => (
        <div className={`graphic-page ${isRed ? 'red-bg' : 'white-bg'}`}>
            <div className="page-header">
                <span>memory {memoryNum}</span>
            </div>

            <div className="photo-container-minimal">
                <div className={`photo-stack ${imageList.length > 1 ? 'multi' : ''}`}>
                    {imageList.map((img, i) => (
                        <div key={i} className={`minimal-frame ${i > 0 ? 'secondary' : ''}`}>
                            <img src={img} alt="Moment" loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="page-footer">
                <div className="footer-meta">
                    <span>{desc}</span>
                </div>
                <div className="big-block-text">{title}</div>
            </div>
        </div>
    );

    const renderAsciiPage = (variant, isRed = false, titleOverride = null) => (
        <div className={`graphic-page ${isRed ? 'red-bg' : 'white-bg'}`}>
            <div className="ascii-container">
                <AsciiHeart variant={variant} />
            </div>
            <div className="page-footer">
                <div className="big-block-text">{titleOverride || variant}</div>
            </div>
        </div>
    );

    return (
        <div className="book-stage">
            <div className="book">
                <div className="book-crevice"></div>
                <Page
                    id="p1"
                    pageNum={1}
                    maxPages={maxPages}
                    isFlipped={!!flippedPages[1]}
                    onFlip={handleFlip}
                    className="cover"
                    frontContent={
                        <div className="cover-modern">
                            <div className="cover-top-white">
                                <div className="cover-title-bold">A compliation of <br />sum memories : Vol 1</div>
                            </div>
                            <div className="cover-bottom-red">
                                <div className="illustration-wrap" style={{ top: '40%' }}>
                                    <svg viewBox="0 0 100 100" className="martini-icon">
                                        <path d="M20 30 L80 30 L50 70 Z" fill="none" stroke="black" strokeWidth="0.5" />
                                        <line x1="50" y1="70" x2="50" y2="90" stroke="black" strokeWidth="0.5" />
                                        <line x1="35" y1="90" x2="65" y2="90" stroke="black" strokeWidth="0.5" />
                                        <path d="M30 45 L34 45 M32 43 L32 47" stroke="black" strokeWidth="0.5" />
                                        <path d="M70 55 L74 55 M72 53 L72 57" stroke="black" strokeWidth="0.5" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    }
                    backContent={renderAsciiPage('lines', false, 'My favorite type of art')}
                />

                {
                    (() => {
                        let photoCount = 0;
                        return interleavedPages.map((page, index) => {
                            const pageNum = index + 2;
                            const isEven = index % 2 === 0;

                            if (page.type === 'photo') {
                                const m1 = photoCount * 2 + 1;
                                const m2 = photoCount * 2 + 2;
                                photoCount++;
                                return (
                                    <Page
                                        key={pageNum}
                                        id={`p${pageNum}`}
                                        pageNum={pageNum}
                                        maxPages={maxPages}
                                        isFlipped={!!flippedPages[pageNum]}
                                        onFlip={handleFlip}
                                        frontContent={renderGraphicPage(page.data.front, page.data.title, page.data.desc, m1, !isEven)}
                                        backContent={renderGraphicPage(page.data.back, '', page.data.desc, m2, isEven)}
                                    />
                                );
                            } else {
                                return (
                                    <Page
                                        key={pageNum}
                                        id={`p${pageNum}`}
                                        pageNum={pageNum}
                                        maxPages={maxPages}
                                        isFlipped={!!flippedPages[pageNum]}
                                        onFlip={handleFlip}
                                        frontContent={renderAsciiPage(page.variant || 'heart', !isEven, page.title)}
                                        backContent={renderAsciiPage(page.variant || 'heart', isEven, null)}
                                    />
                                );
                            }
                        });
                    })()
                }

                <Page
                    id={`p${maxPages}`}
                    pageNum={maxPages}
                    maxPages={maxPages}
                    isFlipped={!!flippedPages[maxPages]}
                    onFlip={handleFlip}
                    frontContent={renderAsciiPage('landscape', false, 'always a delight to witness (esp when u drink hot choki)')}
                    backContent={
                        <div className="final-page-modern red-bg">
                            <div className="hollow-title" style={{ fontSize: '2rem' }}>the end. by cherubin</div>
                        </div>
                    }
                />
            </div >
        </div >
    );
};

export default Book;
