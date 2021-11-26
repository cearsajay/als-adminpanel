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
const CONNECTION_PORT = "192.168.0.49:4001/";
const Create = () => {
    let history = useHistory();
    const [replayDataResponse, setReplayDataResponse] = useState([]);
    const [FeedbackDataResponse, setFeedbackDataResponse] = useState([]);
    const [message, setMessage] = useState("");
    const [AdminId, setAdminId] = useState("");
    const [FeedBackId, setFeedBackId] = useState(0);
    const [mySocket, setMySocket] = useState(socket);
    let itemList = [];
    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
            }
        }
    }, []);
    useEffect(() => {
        scrollTopCustom();
    }, []);
    useEffect(() => {
        let query = new URLSearchParams(history.location.search);
        let id = query.get('id')
        if (id) {
            setFeedBackId(id);
            fetchData(id, true);
        }
    }, [])
    const fetchData = async (id, connect) => {
        let idpass = `?id=${id}`;
        const config = configHeaderAxios();
        axios
            .get(process.env.REACT_APP_BASE_URL + url.feed_back_get_replay + idpass, config)
            .then(async (response) => {
                let Replaydata = response.data.data.replay;
                let feedbackData = response.data.data.feedback;
                await setReplayDataResponse(Replaydata);
                await setFeedbackDataResponse(feedbackData);
                scrollTopCustom();
                if (connect) {
                    connectSocket(feedbackData);
                }

            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    }
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
        socket = io(CONNECTION_PORT, {
            transports: ['websocket'],
            upgrade: false,
            query: {
                "userId": "admin"
            },
            reconnection: false,
            rejectUnauthorized: false,
            cors: {
                origin: "http://localhost:4001",
                credentials: true
            }
        });
        if (JSON.parse(localStorage.getItem('admin_profile'))) {
            setAdminId(JSON.parse(localStorage.getItem('admin_profile')).id);
        }
        setMySocket(socket);
        socket.emit("online", {
            "user_id": feedbackData.user_id,
            "feedback_id": feedbackData.id,
            "type": 2,
        });
        socket.on("supportMessage", (data) => {
            if (data.sender_soc_id !== socket.id) {
                fetchData(data.feedbackData.feedback_id, false);
            }
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
            feedback_id: FeedBackId,
            reply: message,
            send_by: 2,
        };
        await socket.emit("supportMessage", messageContent);
        setReplayDataResponse([...replayDataResponse, messageContent]);
        setMessage("");
        scrollTopCustom();
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
