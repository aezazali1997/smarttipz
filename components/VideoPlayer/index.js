import React from 'react'
import { Player, BigPlayButton } from 'video-react';

const VideoPlayer = ({ poster, src, ...props }) => {
    return (
        <Player
            className="video"
            playsInline
            poster={poster}
            src={src}
        >
            <BigPlayButton position="center " />
        </Player>
    )
}

export default VideoPlayer;
