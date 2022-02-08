import React from 'react'
import InputEmoji from 'react-input-emoji';

const EmojiInput = ({ message, setMessage, handleOnEnter, placeholder, className }) => {
    return (
        <InputEmoji
            value={message}
            onChange={setMessage}
            className={className}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder={placeholder || 'Type a message'}
        />
    )
}

export default EmojiInput;
