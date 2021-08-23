
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { ChatCard, EmojiInput } from '../../../components';
import socket from '../../../utils/socket';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';

var data = [];

const UserMessage = () => {

    const router = useRouter();
    const { id } = router.query;
    const { username } = parseCookies();
    const [loading, isLoading] = useState(true);
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState('');

    const ID = parseInt(id);


    useEffect(() => {
        if (id) {
            socket.auth = { username };
            socket.connect();
            console.log('user', ID);
            socket.emit('get messages', { id: ID });
        }
    }, [id])


    useEffect(() => {
        // if (ID) {
        isLoading(true);
        console.log('here');
        socket.on('get messages', (res) => {
            console.log('returnedRes', res);
            data = res;
        })
        setTimeout(() => {
            console.log("data", data);
            setMessageList(messageList => messageList = data);
            isLoading(false);
        }, 5000);

    }, [socket]);

    useEffect(() => { console.log('updated') }, [messageList]);

    let handleOnEnter = (text) => {
        console.log('enter', text)
        socket.emit("private message", { message: text, to: ID });
        socket.on('private message', (res) => {
            console.log('res', res);
            let copyArray = [...messageList];
            console.log({ copyArray });
            let updatedArray = [...copyArray, res]
            console.log({ updatedArray });
            setMessageList(updatedArray);
            console.log()
        })
    }


    return (
        <div className="h-screen flex flex-col">
            <Helmet>
                <title>Messaging | Smart Tipz</title>
            </Helmet>
            {/* <div className="hidden lg:flex w-full justify-between items-center h-16 px-5 shadow-md">
                <p className="text-xl font-semibold ">Messages</p>
            </div> */}
            <header>
                <div className='flex items-center bg-white space-x-10 p-5 w-full py-3 shadow-md'>
                    <span className="flex border rounded-full hover:shadow-md p-1 cursor-pointer">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <div className="flex items-center w-full space-x-3 mb-2">
                        <img className="inline object-cover w-12 h-10 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image" />
                        <div className="flex flex-col w-full ">
                            <h1 className="text-md md:text-lg lg:text-xl text-bold font-sans">Reena Thomas</h1>
                            {/* <h1 className="text-sm text-gray-600 font-sans"><span className="inline-block w-2 h-2 mr-2 bg-green-600 rounded-full"></span>Active Now</h1> */}
                            {/* <h1 className="text-sm text-gray-600 font-sans">Just Now</h1> */}
                        </div>
                    </div>
                </div>
            </header>
            {/* <hr /> */}
            <main className="flex-1 flex-col overflow-y-auto space-y-3 py-6 px-3 lg:px-5">
                {
                    loading ?
                        <div className="flex flex-col w-full items-center justify-center">
                            <div className="self-center ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>
                            <p className="text-sm text-center text-gray-400">Loading Messages</p>
                        </div>
                        :
                        messageList && messageList.map(({ to, message, time }, index) => (
                            to !== ID ?
                                <div key={index}>
                                    <ChatCard
                                        name={'Naveed Ahsan'}
                                        message={message}
                                        time={time}
                                        containerStyle={`max-w-lg`}
                                        cardStyle={`flex items-center space-x-3`}
                                        imgStyle={`h-10 w-16 rounded-full object-cover md:w-10`}
                                        contentStyle={`py-2 px-4 rounded-3xl bg-gray-100`}
                                        headerStyle={`flex items-center justify-between space-x-3`}
                                        messageStyle={`text-sm text-black`}
                                    />
                                </div>
                                :
                                <div key={index} className={'senderChat'}>
                                    <ChatCard
                                        name={username}
                                        message={message}
                                        time={time}
                                        containerStyle={`max-w-lg`}
                                        cardStyle={`flex items-center space-x-3`}
                                        imgStyle={`h-10 w-16 rounded-full object-cover md:w-10`}
                                        contentStyle={`py-2 px-4 rounded-3xl bg-gray-100`}
                                        headerStyle={`flex items-center justify-between space-x-3`}
                                        messageStyle={`text-sm text-black`}
                                    />
                                </div>
                        ))
                }
            </main>
            <footer>
                <EmojiInput
                    message={message}
                    setMessage={setMessage}
                    handleOnEnter={handleOnEnter}
                />
            </footer>
        </div>
    )
}



export default UserMessage;
