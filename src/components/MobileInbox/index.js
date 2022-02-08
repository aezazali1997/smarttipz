import { isEmpty } from 'lodash';
import React from 'react'
import ChatList from '../ChatList';
import MessageWindow from '../MessageWindow';

const MobileInbox = ({ userList, goBackToUserList, message, setMessage, _OnSelect, selected, loading }) => {
    return (
        <>{
            loading ?
                <div className="flex flex-col h-screen w-full items-center justify-center">
                    <div className="self-center ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>
                    <p className="text-sm text-center text-gray-400">Loading Chat</p>
                </div>
                :
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
        }
        </>
    )
}

export default MobileInbox;
