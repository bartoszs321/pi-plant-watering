import React, { useEffect, useRef, useState } from 'react';
import './CameraFeed.scss';

const CameraFeed = () => {
    const [showVideo, setShowVideo] = useState(false);
    const [onError, setOnError] = useState(false);
    const [imgSrc, setImgSrc] = useState('http://172.29.4.222:8081/single');
    const [showControls, setShowControls] = useState(false);

    const imageRef = useRef<HTMLImageElement>(null);

    const toggleVideoHandler = () => {
        setOnError(false);
        if (showVideo) {
            // Stop the feed from loading in the background
            if (imageRef.current) {
                imageRef.current.src = '';
            }
        }
        if (!onError) setShowVideo((oldState) => !oldState);
    };

    const imageErrorHandler = () => {
        setOnError(true);
        if (imageRef.current) {
            imageRef.current.src = '';
        }
        setShowVideo(false);
    };

    const handleUpdateImage = () => {
        const random = Math.random();
        setImgSrc(`http://172.29.4.222:8081/single?${random}`);
    };

    return (
        <div className='container'>
            <button className='actionButton' onClick={toggleVideoHandler}>
                Toggle Video
            </button>
            <h1>Video:</h1>

            {showVideo && (
                <img
                    className='video-feed'
                    src='http://172.29.4.222:8081/video'
                    ref={imageRef}
                    onError={imageErrorHandler}
                    alt='Camera feed'
                ></img>
            )}
            {onError && <p>Error Loading Video Feed!</p>}
            <h1>Stills:</h1>
            <img src={imgSrc} />
            <button className='actionButton' onClick={handleUpdateImage}>
                Update image
            </button>
            {showControls ? (
                <iframe src='http://172.29.4.222:8081' width={'100%'} />
            ) : null}
            <h1>Controls</h1>
            <button
                className='actionButton'
                onClick={() => setShowControls((prev) => !prev)}
            >
                Show iframe
            </button>
        </div>
    );
};

export default CameraFeed;
