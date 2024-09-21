import React, { useState, useEffect, useRef } from 'react';

const WebSocketComponent = () => {
    const [message, setMessage] = useState('');
    const [input, setInput] = useState('');
    const [error, setError] = useState(null);

    const ws = useRef(new WebSocket('wss://yt2kvyk754.execute-api.ap-northeast-1.amazonaws.com/dev/'));

    useEffect(() => {
        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };
        
        ws.onmessage = (event) => {
            setMessage(event.data);
        };

        ws.onerror = (err) => {
            console.error('WebSocket error', err);
            setError('WebSocket error occurred');
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };
        return () => { 
            if (ws.current && ws.current.readyState === WebSocket.OPEN){
                ws.close(); 
            }
        };
    }, []);

    const sendMessage = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(input); 
            setInput('');
        }
    };
    
    return (
        <div>
            <h1> WebSocket Example</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Received message: {message}</p>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />            
            <button onClick={sendMessage}>Send</button >
        </div>
    );
};

export default WebSocketComponent;