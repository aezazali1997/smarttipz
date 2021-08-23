import { isEmpty } from 'lodash';
import React from 'react'
import ChatList from '../ChatList';
import MessageWindow from '../MessageWindow';

const MobileInbox = ({ userList, goBackToUserList, message, setMessage, _OnSelect, selected }) => {
    return (
        <>
            {
                isEmpty(selected) && (
                    <ChatList
                        users={userList}
                        _OnSelect={_OnSelect}

                    />)}
            {
                !isEmpty(selected) && (
                    <MessageWindow
                        selected={selected}
                        goBackToUserList={goBackToUserList}
                        message={message}
                        setMessage={setMessage}
                    />)

            }
        </>
    )
}

export default MobileInbox;
