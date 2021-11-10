import React from 'react'
import InputEmoji from 'react-input-emoji';

const EmojiInput = ({ message, setMessage, handleOnEnter }) => {
    return (
        <InputEmoji
            value={message}
            onChange={setMessage}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type your message..."
        />
    )
}

export default EmojiInput;
