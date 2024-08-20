import React, { useEffect, useState } from 'react';
import { conversationData, message, User } from '../../Interface/UserInterface';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import socket from '../../Config/Socket';
import { Company } from '../../Interface/CompanyInterface';
import { FaPlus } from 'react-icons/fa';
import { conversation, getcompanymessages } from '../../Api/companyApi';

const Inbox = () => {
  const companyDatas: Company = useSelector((state: RootState) => state.company);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [details, setDetails] = useState<boolean>(false)

  const [message, setMessage] = useState<string>('');
  const  companyData = useSelector((state: RootState) => state.company);
  const [messages, setMessages] = useState<message[]>([]);
  const [add, setAdd] = useState<boolean>(false)
  const [sendlink, setSendlink] = useState<boolean>(false)
  const [link,setLink]=useState<string>('')
  const [search,setSearch]=useState<string>('')
  const [companyConversation,setCompanyConversation]=useState<conversationData[]>()
  const [searchConversation, setsearchConversation] = useState<conversationData[]>([])

  const handleSelectedUser = (data: User) => {
    setMessages([]);
    setSelectedUser(data);
    setDetails(true)

  };

  useEffect(() => {
    if (companyDatas && companyDatas._id) {
      socket.emit('user_login', companyDatas._id);
    }

    const handleMessage = ({
      sender_id,
      reciever_id,
      message,
    }: {
      sender_id: string;
      reciever_id: string;
      message: string;
    }) => {
      const timeStamp = Date.now();
      const data = { sender_id, reciever_id, message, timeStamp };
      setMessages((prevMessages:any) => [...prevMessages, data]);
    };

    socket.on('private_message', handleMessage);

    return () => {
      socket.off('private_message', handleMessage);
    };
  }, [companyData, socket]);
  useEffect(()=>{
    const conversationData = async () => {
      try {
        let response = await conversation()
        if (response?.data.success) {
          setCompanyConversation(response?.data.conversationData)
         setsearchConversation(response?.data.conversationData)

        }
      } catch (error) {
        console.error(error);

      }
    }
    conversationData()
  },[message])
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getcompanymessages(selectedUser?._id as string);
        if (response?.data.messages) {
          const combinedMessages = [
            ...response.data.messages.sender.map((msg: any) => ({
              ...msg,
              type: 'sent',
            })),
            ...response.data.messages.reciever.map((msg: any) => ({
              ...msg,
              type: 'received',
            })),
          ];
          setMessages(combinedMessages);
        }
      } catch (error) {
        console.error(error);
      }
    };
   
      fetchMessages();
    
  }, [selectedUser,socket]);


  const handleMessageSend = (id: string,mes:string) => {
    let data ={}
    if(mes=="message"){
    data= {
      message: message,
      sender_id: companyData._id,
      reciever_id: id,
      timeStamp: Date.now(),
    };
  }else{
     data = {
      message: link,
      sender_id: companyData._id,
      reciever_id: id,
      timeStamp: Date.now(),
    };
  }

    setMessage('');
    setLink('')
    setMessages((prevMessages:any) => [...prevMessages, { ...data, type: 'sent' }]);
    socket.emit('private_message', data);
  };


  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const sortedMessages = messages.sort((a, b) => new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime());
  // const sortedMessages = messages.sort((a, b) => a.timeStamp - b.timeStamp);
  const handleMeet = () => {
    const roomName = `YourRoomName-${Date.now()}`;
    const jitsiURL = `https://meet.jit.si/${roomName}`;
    window.open(jitsiURL, '_blank');
  }
  
  useEffect(() => {
    const searchUser = () => {
      const data = companyConversation?.filter((val) => {        
        return val.sender_id.firstname?.toLowerCase().startsWith(search.toLowerCase())
      })

      setCompanyConversation(data)
    }
    searchUser()
  }, [search])
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    if (value == '') {
      setCompanyConversation(searchConversation)
    }


  }

  return (
    <div className='flex justify-center min-h-screen'>
      <div className='flex justify-center  lg:w-4/5  w-full md:w-4/5 h-auto sm:m-0 md:m-9 lg:m-9'>
      <div className='w-full  flex flex-row  h-5/6 rounded-xl'>
      <div className='p-3 lg:w-96 w-36 shadow-2xl rounded-xl  border-gray-200  space-y-3'>
      <p className='text-2xl font-semibold text-center'>Inbox</p>
            <div className='flex justify-center'>
              <input 
                className='border-2 border-gray-200  w-4/5 h-11'
                onChange={(e) => handleSearch(e)}  type='text'
                placeholder='Search'
              />
            </div>
            <div className='w-full h-20 flex flex-col items-center'>
              {companyConversation && companyConversation.map((values) => {
                
                  return (
                    <div
                      onClick={() => handleSelectedUser(values.sender_id)}
                      className='shadow-md w-full cursor-pointer h-full mt-2 flex items-center'
                      key={values._id}
                    >
                      <ul className='flex flex-row space-x-6 p-9'>
                        <li>
                          {values.sender_id?.img_url ? (
                            <img
                              src={values.sender_id.img_url}
                              className='w-14 h-9 rounded-full'
                              alt=''
                            />
                          ) : (
                            <img
                              src='/user06.png'
                              className='w-14 h-9 rounded-full'
                              alt=''
                            />
                          )}
                        </li>
                        <li className='flex justify-between sm:flex-row flex-col items-center w-full'>
                        <div className='flex flex-col'>
                          <p className='font-semibold text-base'>{values?.sender_id.firstname}</p>
                          <p className='text-sm text-gray-600 truncate max-w-xs'>{values.message}</p>
                        </div>

                      {values.time &&  <div className='text-gray-500 text-xs ml-auto'>
                          {new Date(values.time).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }).toLowerCase().replace(':', '.')}
                        </div>}
                      </li>                      </ul>
                    </div>
                  );
                
              })}
            </div>
          </div>
          <div className='lg:w-full w-1/2 h-full  ml-4 rounded-xl shadow-xl '>
            {selectedUser ? (
              <>
                <div className='h-full w-full flex flex-col'>
                <div className='w-full h-24 border-gray-400/50 border-b-2'>
                <div className='w-full h-13 flex items-center mt-9'>
                      <ul className='flex flex-row space-x-8 pl-6 font-medium'>
                        <li>
                          {selectedUser.img_url ? (
                            <img
                              src={selectedUser.img_url}
                              className='w-11 h-11 rounded-full'
                              alt=''
                            />
                          ) : (
                            <img
                              src='/user06.png'
                              className='w-11 h-11'
                              alt=''
                            />
                          )}
                        </li>
                        <div className='flex flex-col items-center'>
                          <li>{selectedUser.firstname}</li>
                          {selectedUser.online &&
                            <li className='font-normal text-green-500'>Online</li>
                          }                        </div>
                      </ul>
                    </div>
                  </div>
                  <div className='flex-grow w-full  max-h-full overflow-y-auto p-4'>
                    {sortedMessages.map((val, index) => (
                      <div
                        key={index}
                        className={`w-full h-16 flex items-center ${
                          val.type === 'sent' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                         {val.message.startsWith("http") ? (
                          <div className="bg-blue-100 p-4 rounded-lg flex flex-col items-center space-y-2">
                            <p>
                              Join the Meeting
                            </p>
                            <a href={val.message} target="_blank" rel="noopener noreferrer" className="w-full">
                              <button className="w-full bg-blue-500 text-white rounded-lg py-2">
                                Join Now
                              </button>
                            </a>
                          </div>
                        ) : (
                          <p className={`p-2 rounded-lg ${val.type === 'sent' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                            {val.message}
                          </p>
                        )}
                        <p className='pl-6 text-gray-500 text-sm'>
                          {formatTime(val.timeStamp)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className='w-full   lg:p-4 p-0'>
                    <div className='flex items-center'>
                      <input
                        value={message}
                        className='flex-grow border-2 sm:w-20 w-full border-gray-300 rounded-lg p-2'
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                        type='text'
                        placeholder='Type your message...'
                      />
                       <div className="relative">
                        <FaPlus onClick={() => setAdd(!add)} className='ml-2 cursor-pointer' />
                        {add && (
                          <div className="absolute bottom-full mb-8 right-0 w-48 z-50 bg-white border border-gray-200 rounded-lg shadow-lg">

                            <button onClick={handleMeet}
                              type="button"
                              className="relative inline-flex items-center w-full px-4 py-4 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 text-black"
                            >
                              Host Meet
                            </button>
                            <button onClick={() => { setSendlink(!sendlink), setAdd(false) }}
                              type="button"
                              className="relative inline-flex items-center w-full px-4 py-4 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 text-black"
                            >
                              Send Link
                            </button>

                          </div>
                        )}
                      </div>
                     <button
                        onClick={() => handleMessageSend(selectedUser._id as string,"message")}
                        className='ml-4 bg-black text-white p-2 rounded-lg'
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className='flex items-center w-full h-full justify-center'>
                <div className='text-center'>
                  <img src='/conversation.png' className='w-40 mx-auto' alt='' />
                  <p className='font-medium text-xl'>No conversation selected</p>
                </div>
              </div>
            )}
          </div>
          {selectedUser && details &&
            <div className="relative w-1/3 h-full bg-orange-50/65 flex justify-center hidden md:flex">
              <div onClick={() => setDetails(!details)} className="absolute top-2 right-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <div className='mt-6'>
                  <p className='text-xl font-semibold'>Details</p>
                </div>
                <div className="w-32 h-32 rounded-full overflow-hidden mt-8">
                  {selectedUser.img_url ? (
                    <img src={selectedUser.img_url} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <img src="/user06.png" alt="User" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="mt-4">
                  <ul className="text-center space-y-2">
                    <li className="text-lg font-semibold">{selectedUser.firstname} {selectedUser.lastname}</li>
                    <li>{selectedUser.field}</li>
                    <li>{selectedUser.email}</li>
                    <li>{selectedUser.phonenumber}</li>
                    <li>{selectedUser.qualification}</li>
                    <li>{selectedUser.about}</li>
                    <li>{selectedUser.github_url}</li>
                    <li>{selectedUser.portfolio_url}</li>
                  </ul>
                </div>
              </div>
            </div>

          }
        </div>
      </div>
      {sendlink &&
        <div
          id="select-modal"
          aria-hidden="false"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="p-4 md:p-5 rounded-t dark:border-gray-600">
                <button onClick={() => { setSendlink(!sendlink), setAdd(false) }}
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="select-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                  <input  onChange={(e) => {
                          setLink(e.target.value);
                        }} value={link} type="text" placeholder="send link" className="w-full h-11 border-2 rounded-full text-center" />
                  <button
                    onClick={() => {handleMessageSend(selectedUser?._id as string,"link"),setSendlink(!sendlink)}}

                  className="w-full bg-black h-11 mt-4 text-white rounded-full">Submit</button>
                
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Inbox;
