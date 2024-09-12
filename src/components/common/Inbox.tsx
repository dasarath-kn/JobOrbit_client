import React, { useEffect, useRef, useState } from 'react';
import { conversationData, message, User } from '../../Interface/UserInterface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import socket from '../../Config/Socket';
import { conversation, getmessages, getUserdata, shareDocument } from '../../Api/userApi';
import { Company } from '../../Interface/CompanyInterface';
import { FaPlus } from 'react-icons/fa';
import { setUserdetails } from '../../Redux/UserSlice';

const Inbox = () => {
  const [selectedUser, setSelectedUser] = useState<any>();
  const [message, setMessage] = useState<string>('');
  const userData = useSelector((state: RootState) => state.user);
  const companyData = useSelector((state: RootState) => state.company);
  const [messages, setMessages] = useState<message[]>([]);
  const [selected, setSelected] = useState<boolean>(true)
  const [sent, setSent] = useState<boolean>(false)
  const [add, setAdd] = useState<boolean>(false)
  const [sendlink, setSendlink] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [link, setLink] = useState<string>('')
  const [details, setDetails] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [image, setImage] = useState<string | File>()
  const [pdf, setPdf] = useState<string | File>()
  const [imagePreview, setImagePreview] = useState<string>()
  const [pdfPreview, setPdfPreview] = useState<string | undefined>()
  const [userConversation, setUserConverstaion] = useState<conversationData[]>([])
  const [role, setRole] = useState<string>('user')
  const [updated, setUpdated] = useState<boolean>(false)
  const [searchConversation, setsearchConversation] = useState<conversationData[]>([])
  const handleSelectedUser = (data: User | Company) => {
    setMessages([]);
    setSelectedUser(data);
    setDetails(true)
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef1 = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleButtonClickpdf = () => {
    if (fileInputRef1.current) {
      fileInputRef1.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  };
  const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPdf(file)
      const reader = new FileReader();
      reader.onload = (event) => {
        setPdfPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const userData = async () => {
      try {
        let response = await getUserdata()
        if (response?.data.success) {
          dispatch(setUserdetails(response?.data.userData))
        }

      } catch (error) {
        console.error(error);

      }
    }

    userData()

  }, [sent, socket, selected, role])
  useEffect(() => {
    const conversationData = async () => {
      try {
        let response = await conversation(role)
        if (response?.data.success) {
          setUserConverstaion(response.data.conversationData)
          setsearchConversation(response.data.conversationData)

        }
      } catch (error) {
        console.error(error);

      }
    }
    conversationData()
  }, [role, sent, socket, selectedUser, message])



  useEffect(() => {
    const searchUser = () => {
      const data = userConversation.filter((val) => {
        return val.reciever_id.firstname?.toLowerCase().startsWith(search.toLowerCase())
      })
      setUserConverstaion(data)
    }
    searchUser()
  }, [search])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    if (value == '') {
      setUserConverstaion(searchConversation)
    }


  }


  useEffect(() => {
    if (selected) {
      if (userData && userData._id) {
        socket.emit('user_login', userData._id);
      }

      const handleUserMessage = ({
        sender_id,
        reciever_id,
        message,
        role
      }: {
        sender_id: string;
        reciever_id: string;
        message: string,
        role: string
      }) => {
        const timeStamp = Date.now();
        const data = { sender_id, reciever_id, message, timeStamp, role };
        setMessages((prevMessages: any) => [...prevMessages, data]);
      };
      const data =({message}:any)=>{
        console.log(message,"dfdf");
        
      }
      socket.on("document",data)
      
      socket.on('private_message', handleUserMessage);

      return () => {
        socket.off('private_message', handleUserMessage);
        socket.off("document",data)
      };
    } else {
      if (companyData && companyData._id) {
        socket.emit('user_login', companyData._id);
      }

      const handleCompanyMessage = ({
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
        setMessages((prevMessages: any) => [...prevMessages, data]);
      };

      socket.on('private_message', handleCompanyMessage);

      return () => {
        socket.off('private_message', handleCompanyMessage);
      };

    }
  }, [userData, companyData, selected, socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getmessages(selectedUser?._id as string);

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

  }, [selectedUser, socket, selected, updated]);
  useEffect(()=>{
    console.log("helooooooooooooo");
    
    const data =({message}:any)=>{
      console.log(message,"dfdf");
      
    }
    socket.on("document",data)
    return () =>{
      socket.off("document")
    }
  },[socket])
  const handleMessageSend = (id: string, mes: string) => {
    let data = {}
    if (mes == "message") {
      data = {
        message: message,
        sender_id: userData._id,
        reciever_id: id,
        timeStamp: Date.now(),
      };
    } else {
      data = {
        message: link,
        sender_id: userData._id,
        reciever_id: id,
        timeStamp: Date.now(),
      };

    }
    setMessage('');
    setLink('')
    setSent(!sent)

    setMessages((prevMessages: any) => [...prevMessages, { ...data, type: 'sent' }]);
    socket.emit('private_message', data);
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const sortedMessages = messages.sort((a, b) => new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime());
  const handleMeet = () => {
    const roomName = `YourRoomName-${Date.now()}`;
    const jitsiURL = `https://meet.jit.si/${roomName}`;
    window.open(jitsiURL, '_blank');
  }
  const handleDocument = async (reciever_id: string) => {
    try {
      const formData = new FormData()
      if (image) {
        formData.append("reciever_id", reciever_id)
        formData.append("image", image as File)
        formData.append("field", "image")
        const document = await shareDocument(formData)
        if (document?.data.success) {
          const data ={reciever_id:reciever_id}
          socket.emit("document",data)
          setImagePreview("")
          setImage("")
          setUpdated(!updated)

        }

      } else {
        formData.append("reciever_id", reciever_id)
        formData.append("image", pdf as File)
        formData.append("field", "pdf")
        const document = await shareDocument(formData)
        if (document?.data.success) {
          setPdfPreview("")
          setPdf("")
          setUpdated(!updated)

        }

      }
    } catch (error) {
      console.error(error);

    }
  }


  return (
    <div className='flex justify-center w-full min-h-screen'>
      <div className='flex justify-center  lg:w-4/5  w-full md:w-4/5 h-auto sm:m-0 md:m-9 lg:m-9'>
        <div className='w-full  flex flex-row  h-5/6 rounded-xl'>
          <div className='p-3 lg:w-96 w-36 shadow-2xl rounded-xl  border-gray-200  space-y-3'>
            <p className='text-2xl font-semibold text-center'>Inbox</p>

            <div className='flex justify-evenly  flex-col md:flex-row lg:flex-row w-full h-11 text-white'>

              <button onClick={() => { setSelected(true), setRole('user'),setSelectedUser(null) }} className={`w-full h-11 text-black ${!selected ? '  font-semibold' : 'text-xl border-b-2   font-semibold'}`}>People</button>
              <button onClick={() => { setSelected(false), setRole('company'),setSelectedUser(null) }} className={`w-full h-11 text-black ${selected ? '  font-semibold' : 'text-xl border-b-2  font-semibold'}`}>Companies</button>
            </div>
            {selected ? <div className='cursor-pointer   w-full h-20 flex flex-col items-center'>
              <div className='flex justify-center mb-6 mt-2 w-full'>
                <input
                  onChange={(e) => handleSearch(e)} className='border-2 border-gray-200  w-4/5 h-11'
                  type='text'
                  placeholder='Search'
                />
              </div>

              {userConversation.map((values) => {
                return (
                  <div
                    onClick={() => handleSelectedUser(values.reciever_id)}
                    className='shadow-md w-full h-full mt-2 flex items-center'
                    key={values.reciever_id._id}
                  >
                    <ul className='flex items-center space-x-4 p-9 w-full'>
                   { !details &&  <li className='hidden sm:block'>
                        {values?.reciever_id.img_url ? (
                          <img
                            src={values.reciever_id.img_url}
                            className='w-14 h-11 rounded-full'
                            alt='User'
                          />
                        ) : (
                          <img
                            src='/user06.png'
                            className='w-14 h-11 rounded-full'
                            alt='Default User'
                          />
                        )}
                      </li>}


                      <li className='flex justify-between sm:flex-row flex-col items-center w-full'>
                        <div className='flex flex-col'>
                          <p className='font-semibold text-base'>{values?.reciever_id.firstname}</p>
                          <p className='text-sm text-gray-600 truncate max-w-xs'>{values.message}</p>
                        </div>

                        {values.time && <div className='text-gray-500 text-xs ml-auto'>
                          {new Date(values.time).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }).toLowerCase().replace(':', '.')}
                        </div>}
                      </li>
                    </ul>
                  </div>

                );

              })}
            </div>
              : <div className='w-full h-20 flex flex-col  items-center'>
                {userConversation.map((values) => {

                  return (
                    <div
                      onClick={() => handleSelectedUser(values.reciever_id)}
                      className="shadow-md w-full h-full flex items-center p-4"
                    >
                      <ul className="flex flex-row space-x-4 w-full items-center">
                    {!details&&    <li>
                          {values.reciever_id?.img_url ? (
                            <img
                              src={values.reciever_id.img_url}
                              className="w-11 h-11 rounded-full"
                            />
                          ) : (
                            <img
                              src="/user06.png"
                              className="w-11 h-11 rounded-full object-cover"
                              alt=""
                            />
                          )}
                        </li>}
                        <li className="flex justify-between items-center w-full">
                          <div className="flex flex-col">
                            <p className="font-semibold text-base">{values?.reciever_id.companyname}</p>
                            <p className="text-sm text-gray-600 truncate max-w-xs">{values.message}</p>
                          </div>
                          {values.time && (
                            <div className="text-gray-500 text-xs ml-auto">
                              {new Date(values.time).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                              }).toLowerCase().replace(':', '.')}
                            </div>
                          )}
                        </li>
                      </ul>
                    </div>

                  );

                })}
              </div>}
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
                              className='w-12 h-12 rounded-full'
                              alt=''
                            />
                          ) : (
                            <img
                              src='/user06.png'
                              className='w-12 h-12'
                              alt=''
                            />
                          )}
                        </li>
                        <div className='flex flex-col items-center'>
                          {selected ?
                            <li>{selectedUser.firstname}</li> :
                            <li>{selectedUser.companyname}</li>

                          }
                          {selectedUser.online &&
                            <li className='font-normal text-green-500'>Online</li>
                          }
                        </div>
                      </ul>
                    </div>
                  </div>
                  <div className='flex-grow w-full  max-h-full overflow-y-auto p-4'>
                    {sortedMessages.map((val, index) => (
                      <div
                        key={index}
                        className={`w-full flex flex-col items-start ${val.type === 'sent' ? 'items-end' : 'items-start'}`}
                      >
                        {val.field == "image" && val.url && (
                          <div className="my-2">
                            <img
                              src={val.url}
                              alt="media"
                              className="w-48 h-auto rounded-lg shadow-md"
                            />
                          </div>
                        )}
                        {val.field === "pdf" && val.url && (
                          <div className="my-2">
                            <div
                              onClick={() => window.open(val.url, '_blank')}  // Open the PDF in a new tab on click
                              className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer"
                            >                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M14 2v6h6"
                                />
                              </svg>
                              <span className="text-center text-gray-600">PDF</span>
                            </div>
                          </div>
                        )}


                        {val.message && val.message.startsWith("http") ? (
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
                        <p className="pl-6 text-gray-500 text-sm">
                          {formatTime(val.timeStamp)}
                        </p>
                      </div>
                    ))}

                  </div>
                  <div className='w-full lg:p-4 p-0'>
                    {pdfPreview && (
                      <div className="relative mb-4 w-24">
                        <iframe
                          src={pdfPreview}
                          title="PDF Preview"
                          className="w-32 h-48 rounded-lg"
                          frameBorder="0"
                        ></iframe>
                        <button
                          type="button"
                          onClick={() => { setPdfPreview("") }}
                          className="absolute top-0 right-0 m-1 text-white bg-red-600 hover:bg-red-800 rounded-full p-1"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    )}

                    {imagePreview && <div className="relative mb-4 w-24">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="w-32 h-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => { setImagePreview(""), setImage("") }}
                        className="absolute top-0 right-0 m-1 text-white bg-red-600 hover:bg-red-800 rounded-full p-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>}
                    <div className="flex items-center space-x-2">
                      <input
                        value={message}
                        className="flex-grow border-2 border-gray-300 rounded-lg p-2"
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                        type="text"
                        placeholder="Type your message..."
                      />
                      <div className="relative">
                        <FaPlus onClick={() => setAdd(!add)} className="ml-2 cursor-pointer" />
                        {add && (
                          <div className="absolute bottom-full mb-8 right-0 w-48 z-50 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <button
                              onClick={handleMeet}
                              type="button"
                              className="relative inline-flex items-center w-full px-4 py-4 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 text-black"
                            >
                              Host Meet
                            </button>
                            <button
                              onClick={() => {
                                setSendlink(!sendlink);
                                setAdd(false);
                              }}
                              type="button"
                              className="relative inline-flex items-center w-full px-4 py-4 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 text-black"
                            >
                              Send Link
                            </button>
                            <div>
                              <button
                                type="button"
                                onClick={handleButtonClick}
                                className="relative inline-flex items-center w-full px-4 py-4 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 text-black"
                              >
                                Send Image
                              </button>
                              <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                              />
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={handleButtonClickpdf}

                                className="relative inline-flex items-center w-full px-4 py-4 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 text-black"
                              >
                                Send Resume
                              </button>
                              <input
                                type="file"
                                accept=".pdf"
                                ref={fileInputRef1}
                                style={{ display: 'none' }}
                                onChange={handlePdfChange}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      {image || pdf ? <button

                        onClick={() => { handleDocument(selectedUser._id), setAdd(false) }}
                        className="ml-4 bg-black text-white p-2 rounded-lg"
                      >
                        Send
                      </button> : <button
                        disabled={message.length === 0}
                        onClick={() => handleMessageSend(selectedUser._id, "message")}
                        className="ml-4 bg-black text-white p-2 rounded-lg"
                      >
                        Send
                      </button>}
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
                <input onChange={(e) => {
                  setLink(e.target.value);
                }} value={link} type="text" placeholder="send link" className="w-full h-11 border-2 rounded-full text-center" />
                <button
                  onClick={() => { handleMessageSend(selectedUser._id, "link"), setSendlink(!sendlink) }}

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
