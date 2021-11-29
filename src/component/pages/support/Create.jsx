import React, { useEffect, useState, useRef } from 'react';
import $ from "jquery";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { useForm } from "react-hook-form";
//  start custome url define
import url from "../../../Development.json";
import { errorResponse, successResponse, isError, configHeaderAxios } from "../../helpers/response";
import Moment from 'moment';
import io from "socket.io-client";
let socket;
const CONNECTION_PORT = process.env.REACT_APP_CONNECTION_PORTS;
const Create = () => {
    let history = useHistory();
    const [FeedBackImagesDataResponse, setFeedBackImagesDataResponse] = useState([]);
    const [replayDataResponse, setReplayDataResponse] = useState([]);
    const [FeedbackDataResponse, setFeedbackDataResponse] = useState([]);
    const [message, setMessage] = useState("");
    const [AdminId, setAdminId] = useState("");
    const [FeedBackId, setFeedBackId] = useState(0);
    const [mySocket, setMySocket] = useState(socket);
    let itemList = [];
    let imageList = [];
    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
            }
        }
    }, []);
    useEffect(() => {
        scrollTopCustom();
    });
    useEffect(() => {
        let query = new URLSearchParams(history.location.search);
        let id = query.get('id')
        if (id) {
            setFeedBackId(id);
            fetchData(id);
        }
    }, [])
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count === 0) {
            if (FeedbackDataResponse.id) {
                connectSocket(FeedbackDataResponse);
                setCount(1);
                socket.on("supportMessage", async (data) => {
                    console.log("jp");
                    console.log(data);
                    await fetchData(FeedBackId);
                });
            }
        }

    }, [FeedbackDataResponse])

    const fetchData = async (id) => {
        let idpass = `?id=${id}`;
        const config = configHeaderAxios();
        axios
            .get(process.env.REACT_APP_BASE_URL + url.feed_back_get_replay + idpass, config)
            .then(async (response) => {
                let Replaydata = response.data.data.replay;
                let feedbackData = response.data.data.feedback;
                feedbackData.feedback_id = feedbackData.id;
                await setFeedBackImagesDataResponse(feedbackData.feed_back_image);
                await setReplayDataResponse(Replaydata);
                await setFeedbackDataResponse(feedbackData);
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    }
    imageList = FeedBackImagesDataResponse.map((item, i) => {
        return <>
            <img src={item.image} alt={item.image} className="imageTableDataTable" />
        </>
    })
    itemList = replayDataResponse.map((item, i) => {
        let classNameGiven = '';
        if (item.send_by == 1) {
            classNameGiven = 'message-chat-list-sec left-chat';
        }
        if (item.send_by == 2) {
            classNameGiven = 'message-chat-list-sec right-chat';
        }
        return <>
            <div key={++i} className={classNameGiven}>
                <div className="message-chat-area">
                    <p>{item.reply}</p>
                    <div className="msg-time">
                        {Moment(item.createdAt).format('YYYY-MM-DD HH:MM:SS')}
                    </div>
                </div>
            </div>
        </>
    })
    // socket Start
    const connectSocket = async (feedbackData) => {
        console.log("try socket connect");
        socket = io('/', {
            path: "/alssocket",
            secure: false,
            // transports: ['websocket'],
            upgrade: false,
            reconnection: false,
            rejectUnauthorized: false,
        });
        console.log("socket");
        console.log(socket);
        if (JSON.parse(localStorage.getItem('admin_profile'))) {
            setAdminId(JSON.parse(localStorage.getItem('admin_profile')).id);
        }
        setMySocket(socket);
        socket.emit("online", {
            "user_id": feedbackData.user_id,
            "feedback_id": feedbackData.id,
            "type": 2,
        });
        socket.on("supportMessage", async (data) => {
            console.log("jp");
            console.log(data);
            await fetchData(FeedBackId);
        });
    };
    const scrollTopCustom = async () => {
        $(function () {
            var wtf = $('.chatscrollbar');
            var height = wtf[0].scrollHeight;
            wtf.scrollTop(height);
        });
    };
    const sendMessage = async () => {
        let messageContent = {
            user_id: FeedbackDataResponse.user_id,
            admin_id: AdminId,
            feedback_id: Number(FeedBackId),
            reply: message,
            send_by: 2,
        };
        await socket.emit("supportMessage", messageContent);
        await fetchData(FeedBackId);
        setMessage("");
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }
    // socket Stop
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="chat-main-section">
                        <div className="chat-content-box chatscrollbar" >
                            <div className="message-data">
                                <p>
                                    <h3>
                                        {FeedbackDataResponse.from_user_name}
                                    </h3>
                                </p>
                            </div>
                            <div className="message-data">
                                <p>
                                    Ticket Id :- {FeedbackDataResponse.ticket_id}
                                </p>
                            </div>
                            <div className="message-data">
                                <p>
                                    {FeedbackDataResponse.from_user_name}
                                    {" need support for "}
                                    {FeedbackDataResponse.feed_back_type_name}
                                </p>
                            </div>

                            <div className="message-date">
                                <p>
                                    {Moment(FeedbackDataResponse.createdAt).format('YYYY-MM-DD HH:MM:SS')}
                                </p>
                            </div>

                            <div className="message-data">
                                <p>
                                    Message :- {FeedbackDataResponse.message}
                                </p>
                            </div>
                            <div className="message-data">
                                {imageList}
                            </div>

                            {itemList}
                        </div>
                        <div className="message-chat-footer">
                            <div className="message-chat-enter-area">
                                <input type="text" onKeyDown={handleKeyDown} className="form-control" id="message" name="message" value={message} placeholder="Write a message" onChange={(e) => {
                                    setMessage(e.target.value);
                                }} />
                                <div className="chat-actions-button">
                                    {/* <+div className="chat-attach-link">
                                        <div className="file-icon-select">
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                        <input type="file" name="" />
                                    </+div> */}
                                    <button type="button" onClick={sendMessage} className="chat-msg-send-btn">
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        <i className="fa fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Create;
