
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { Button, ChatCard, EmojiInput } from 'src/components';
import socket from 'utils/socket';
import axiosInstance from 'src/APIs/axiosInstance';
import { scrollToBottom } from 'helpers';
import { useSearchContext } from 'src/contexts';

const UserMessage = () => {
  const router = useRouter();
  const { id } = router.query;
  let { otherUserDetail } = useSearchContext();
  if (isEmpty(otherUserDetail) && typeof window !== 'undefined') {
    otherUserDetail = {
      picture: JSON.parse(localStorage.getItem('profile')).picture,
      name: JSON.parse(localStorage.getItem('profile')).name
    };
  }
  const { username } = parseCookies();
  const [loading, isLoading] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');

  const ID = parseInt(id);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (id) {
      isLoading(true);
      socket.auth = { username, otherUserID: ID };
      socket.connect();
      socket.on('connected', (res) => {
        console.log(res);
      });
      const data = { id: ID };
      axiosInstance
        .privateChat(data)
        .then(({ data: { error, data, message } }) => {
          setMessageList(data);
          isLoading(false);
          scrollToBottom(messagesEndRef);
        })
        .catch((e) => {
          console.log(e.response.data.message);
        });
      return () => {
        socket.emit('Disconnect');
      };
    }
  }, [id]);

  useEffect(() => {
    // console.log('updated');
    socket.on('recieveMessage', (res) => {
      // console.log('res', res);
      let copyArray = [...messageList];
      // console.log({ copyArray });
      let updatedArray = [...copyArray, res];
      // console.log({ updatedArray });
      setMessageList(updatedArray);
      scrollToBottom(messagesEndRef);
    });
  }, [messageList]);

  let handleOnEnter = (text) => {
    // console.log('enter', text)
    if (text !== '') {
      socket.emit('sendMessage', { message: text, to: ID });
    }
  };

  let _GoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col relative">
      <Helmet>
        <title>Messaging | Smart Tipz</title>
      </Helmet>
      {/* <div className="hidden lg:flex w-full justify-between items-center h-16 px-5 shadow-md">
                <p className="text-xl font-semibold ">Messages</p>
            </div> */}
      <div className="px-5 py-3">
        <Button
          onSubmit={_GoBack}
          type="button"
          childrens={
            <>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="pr-2">Back</span>
            </>
          }
          classNames={'px-3 py-2 flex justify-center items-center text-white text-md font-semibold btn rounded-full'}
        />
      </div>
      <header>
        <div className="flex bg-white items-center w-full space-x-5 py-3 px-5">
          <div className="flex  w-full space-x-3 items-center">
            <img
              className="inline object-cover w-12 h-10 rounded-full"
              src={
                otherUserDetail.picture ||
                'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
              }
              alt="Profile image"
            />
            <div className="flex flex-col w-full ">
              <h1 className="text-md md:text-lg lg:text-xl text-bold font-sans">
                {otherUserDetail?.name || 'Lorem Ipsum'}
              </h1>
              {/* <h1 className="text-sm text-gray-600 font-sans"><span className="inline-block w-2 h-2 mr-2 bg-green-600 rounded-full"></span>Active Now</h1> */}
              {/* <h1 className="text-sm text-gray-600 font-sans">Just Now</h1> */}
            </div>
          </div>
        </div>
      </header>
      <hr />
      <main className="flex flex-col overflow-y-auto space-y-3 py-6 px-3 lg:px-5">
        {loading ? (
          <div className="flex flex-col w-full items-center justify-center h-full">
            <div className=" mt-50 self-center ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>
            <p className="text-sm text-center text-gray-400">Loading Messages</p>
          </div>
        ) : (
          !isEmpty(messageList) && (
            <>
              {messageList.map(({ to, message, time }, index) =>
                to !== ID ? (
                  <div key={index} className="mt-auto">
                    <ChatCard
                      name={otherUserDetail?.name || 'Dummy'}
                      image={otherUserDetail?.picture}
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
                ) : (
                  <div key={index} className="senderChat mt-auto">
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
                )
              )}
              <div ref={messagesEndRef} />
            </>
          )
        )}
      </main>
      <footer className="px-2 bottom-10 w-full fixed">
        <EmojiInput message={message} setMessage={setMessage} handleOnEnter={handleOnEnter} />
      </footer>
    </div>
  );
};



export default UserMessage;
