import React, { useState, useEffect } from 'react';

import { generateClient } from 'aws-amplify/api'

import { listMessages } from './graphql/queries';
import { createMessages, updateMessages, deleteMessages } from './graphql/mutations';

import './App.css';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import MapComponent from './components/MapComponent';

function App() {
  const [latitude, setLatitude] = useState(35.6895); // 初期値: 東京の緯度
  const [longitude, setLongitude] = useState(139.6917); // 初期値: 東京の経度
  const [info, setInfo] = useState("東京タワー");
  
  const [messages, setMessages] = useState();
  const client = generateClient();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
        const messages = await client.graphql({ query: listMessages });
        console.log('messages:', messages);

        //setMessages(messages.data.listMessages.items);
    } catch (err) {
        console.log('error fetching messages:', err);
    }
  };

  // const addMessage = async () => {
  //   const newMessage = { name: "New Message", description: "New Message description" };
  //   try {
  //       const response = await API.graphql(graphqlOperation(createMessages, { input: newMessage }));
  //       const message = response.data.createMessage;
  //       setMessages([...messages, message]);
  //   } catch (err) {
  //       console.log('error creating todo:', err);
  //   }
  // };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <MapComponent latitude={latitude} longitude={longitude} zoom={13} info={info} />
          <div>
            <button onClick={signOut}>Sign out</button>
            <p>ユーザー: {user ? user.username : '未ログイン'}</p>
          </div>

          <div>
            <label>
              緯度:
              <input type="number" value={latitude} onChange={(e) => setLatitude(parseFloat(e.target.value))} />
            </label>
            <label>
              経度:
              <input type="number" value={longitude} onChange={(e) => setLongitude(parseFloat(e.target.value))} />
            </label>
            <label>
              情報:
              <input type="text" value={info} onChange={(e) => setInfo(e.target.value)} />
            </label>            
            {/* <button onClick={addMessage}>Add Message</button> */}
            {/* <ul>
              {messages.map((message, index) => (
                <li key={index}>{message.description}</li>
              ))}
            </ul> */}
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
