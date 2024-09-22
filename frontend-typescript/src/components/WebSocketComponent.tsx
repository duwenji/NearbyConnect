import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import throttle from 'lodash.throttle';

interface ParsedData {
  action: string;
  data: string;
}

const WebSocketComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [inputMsg, setInputMsg] = useState<string>('auieo');
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const inputMsgRef = useRef<string>(inputMsg);

  useEffect(() => {
    inputMsgRef.current = inputMsg;
  }, [inputMsg]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const waitForOpenConnection = (socket: WebSocket): Promise<void> => {
      return new Promise((resolve, reject) => {
        const maxAttempts = 10;
        let attempts = 0;

        const interval = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            clearInterval(interval);
            resolve();
          } else if (attempts >= maxAttempts) {
            clearInterval(interval);
            reject(new Error('WebSocket connection failed to open.'));
          }
          attempts++;
        }, 100); // Check every 100ms
      });
    };

    const createWebSocketConnection = async () => {
      if (ws.current && (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING)) {
        console.log('ws.current.readyState: ', ws.current.readyState);
        if (ws.current.readyState === WebSocket.CONNECTING) {
          try {
            await waitForOpenConnection(ws.current);
          } catch (error) {
            console.error(error);
            return;
          }
        }
        ws.current.close();
      }

      ws.current = new WebSocket('wss://yt2kvyk754.execute-api.ap-northeast-1.amazonaws.com/dev/');

      setInputMsg(''); // メッセージ送信後に入力フィールドをクリア

      ws.current.onopen = () => console.log('WebSocket connection opened');
      ws.current.onclose = () => console.log('WebSocket connection closed');
      ws.current.onmessage = (event: MessageEvent) => {
        console.log('onmessage: ', event);
        let parsedData: ParsedData | string = JSON.parse(event.data);
        console.log('parsedData: ', parsedData);

        if (typeof parsedData === 'string') {
          console.log('parsedDataが文字列でした');
          parsedData = JSON.parse(parsedData);
        }

        if ((parsedData as ParsedData).action === "message") {
          console.log('parsedData.data: ', (parsedData as ParsedData).data);
          setMessage((parsedData as ParsedData).data);
        } else {
          setMessage(parsedData as string);
        }
        setError("");
      };
      ws.current.onerror = (err: Event) => {
        console.error('WebSocket error', err);

        const errorMessage = `WebSocket error: ${(err as ErrorEvent).message || JSON.stringify(err)}`;
        console.info('errorMessage: ', errorMessage);
        setError(errorMessage);

        timeoutId = setTimeout(() => {
          console.log('Attempting to reconnect...');
          createWebSocketConnection();
        }, 5000);
      };
    };

    createWebSocketConnection();

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const sendMessage = () => {
    console.log('sendMessage: ', inputMsgRef.current);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        action: "message",
        data: inputMsgRef.current
      });
      console.log('sendMessage: ', message);
      ws.current.send(message);
    } else {
      setError('WebSocket is not open');
    }
  };

  const throttledSendMessage = useRef(throttle(sendMessage, 3000)).current;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMsg(e.target.value);
  };

  return (
    <div>
      <h1>WebSocket Component</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Received message: {message}</p>
      <input
        type="text"
        value={inputMsg}
        onChange={handleInputChange}
      />
      <button onClick={throttledSendMessage}>Send</button>
    </div>
  );
};

export default WebSocketComponent;


