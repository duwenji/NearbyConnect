import React, { useState } from 'react';
import './App.css';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import MapComponent from './components/MapComponent';

function App() {
  const [latitude, setLatitude] = useState(35.6895); // 初期値: 東京の緯度
  const [longitude, setLongitude] = useState(139.6917); // 初期値: 東京の経度
  const [info, setInfo] = useState("東京タワー");
  
  return (
<Authenticator>
      {({ signOut, user }) => (
        <div>
          <h1>Hello, {user?.username}!</h1>
          <button onClick={signOut}>Sign out</button>

          <MapComponent latitude={latitude} longitude={longitude} zoom={13} info={info} />
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
          </div>

        </div>
      )}
    </Authenticator>
  );
}

export default App;
