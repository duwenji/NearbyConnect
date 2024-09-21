import React, { useState, useEffect, useRef } from 'react';
import throttle from 'lodash.throttle';

const WebSocketComponent = () => {
    const [message, setMessage] = useState('');
    const [inputMsg, setInputMsg] = useState('auieo');
    const [error, setError] = useState(null);
    const ws = useRef(null);
    const inputMsgRef = useRef(inputMsg);

    useEffect(() => {
        inputMsgRef.current = inputMsg;
    }, [inputMsg]);

    useEffect(() => {
        ws.current = new WebSocket('wss://yt2kvyk754.execute-api.ap-northeast-1.amazonaws.com/dev/');

        ws.current.onopen = () => console.log('WebSocket connection opened');
        ws.current.onclose = () => console.log('WebSocket connection closed');
        ws.current.onmessage = (event) => console.log('onmessage: ', event.data);
        ws.current.onerror = (err) => console.error('WebSocket error', err);

        // クリーンアップ関数
        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };
    }, []);

    const sendMessage = () => {
        console.log('sendMessage: ', inputMsgRef.current);

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(inputMsgRef.current);
            setInputMsg(''); // メッセージ送信後に入力フィールドをクリア
        } else {
            setError('WebSocket is not open');
        }
    };

    const throttledSendMessage = useRef(throttle(sendMessage, 3000)).current;

    return (
        <div>
            <h1>WebSocket Component</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Received message: {message}</p>
            <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
            />
            <button onClick={throttledSendMessage}>Send</button>
        </div>
    );
};

export default WebSocketComponent;