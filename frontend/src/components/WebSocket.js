import React, { useState, useEffect, useRef } from 'react';
import throttle from 'lodash.throttle';

// Reactを用いてWebSocket接続を扱うコンポーネントです。
// このコンポーネントは、ユーザーからの入力をWebSocketサーバーに送信し、
// サーバーからのメッセージを受信する機能を持っています。
// WebSocketComponentは、ユーザーが入力したテキストをWebSocketサーバーに送信し、
// サーバーからの応答を受け取ります。また、エラーメッセージを表示する箇所も設けられており、
// WebSocketの接続状態に応じて動作を変えるようになっています。
// また、メッセージの送信頻度を制限するために`throttle`が利用されています。
const WebSocketComponent = () => {
    // - `message`: サーバーから受信したメッセージを格納するステート。
    // - `inputMsg`: ユーザーが入力したメッセージを格納するステート。
    // - `error`: エラーメッセージを格納するステート。
    // - `ws`: WebSocketインスタンスを格納するために`useRef`を使用。
    // - `inputMsgRef`: `inputMsg`の現在の値を保持するための参照。
    const [message, setMessage] = useState('');
    const [inputMsg, setInputMsg] = useState('auieo');
    const [error, setError] = useState(null);
    const ws = useRef(null);
    const inputMsgRef = useRef(inputMsg);

    // `inputMsg`が変更された際に最新の値を`inputMsgRef`に更新する。
    useEffect(() => {
        inputMsgRef.current = inputMsg;
    }, [inputMsg]);

    // WebSocket接続とそのイベントハンドラを設定する。
    useEffect(() => {
        let timeoutId;

        const createWebSocketConnection = () => {
            if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
                ws.current.close();
            }
            
            ws.current = new WebSocket('wss://yt2kvyk754.execute-api.ap-northeast-1.amazonaws.com/dev/');
    
            setInputMsg(''); // メッセージ送信後に入力フィールドをクリア
    
            ws.current.onopen = () => console.log('WebSocket connection opened');
            ws.current.onclose = () => console.log('WebSocket connection closed');
            ws.current.onmessage = (event) => {
                console.log('onmessage: ', event);
                // サーバーからのメッセージを受信した際に、`message`ステートを更新する。
                // メッセージはJSON形式で受信されるため、`JSON.parse`を用いてパースする。
                let parsedData = JSON.parse(event.data);
                console.log('parsedData: ', parsedData);
    
                // parsedDataが文字列の場合、Jsonで再度パースす再度パースする
                if (typeof parsedData === 'string'){
                    console.log('parsedDataが文字列でした');
                    
                    parsedData = JSON.parse(parsedData);
                }
    
                if (parsedData.action === "message"){
                    console.log('parsedData.data: ', parsedData.data);
                    setMessage(parsedData.data);
                }else{
                    setMessage(parsedData);
                }
                setError("");
            };
            ws.current.onerror = (err) => {
                console.error('WebSocket error', err);
    
                const errorMessage = `WebSocket error: ${err.message || JSON.stringify(err)}`;
                setError(errorMessage);
    
                // 必要に応じて再接続のロジックを追加
                // 例: 5秒後に再接続を試みる
                timeoutId = setTimeout(() => {
                    console.log('Attempting to reconnect...');
                    createWebSocketConnection();
                }, 5000);
            };    
        };

        // WebSocket接続を作成する関数を呼び出す
        createWebSocketConnection();

        // クリーンアップ関数
        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);

    // `inputMsgRef`の現在の値をWebSocketサーバーに送信する関数。送信成功後、入力フィールドをクリア。
    const sendMessage = () => {
        console.log('sendMessage: ', inputMsgRef.current);

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            let message = JSON.stringify({
                action:"message",
                data:inputMsgRef.current
            });
            console.log('sendMessage: ', message);
            ws.current.send(message);
        } else {
            setError('WebSocket is not open');
        }
    };

    // sendMessage`関数を3000ミリ秒（3秒）に一度だけ実行するようthrottleしたもの。
    const throttledSendMessage = useRef(throttle(sendMessage, 3000)).current;

    // コンポーネントのレンダリング部分は次の通り:
    // - `input`フィールドでは、ユーザーが入力したテキストが`inputMsg`ステートに反映されます。
    // - `button`をクリックすることで、`throttledSendMessage`が呼ばれ、メッセージがWebSocketサーバーに送信されます。
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