import React from 'react'
import { Player, BigPlayButton } from 'video-react';

const VideoPlayer = ({ poster, src, className, ...props }) => {
    return (
        <Player
            className={className}
            playsInline
            poster={poster}
            src={src}
        >
            <BigPlayButton position="center "  />
        </Player>
    )
}

export default VideoPlayer;
