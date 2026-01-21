import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Upload from './components/Upload';
import VideoList from './components/VideoList';

function App() {
  const [user, setUser] = useState(null);

  useEffect(()=> {
    fetch(import.meta.env.VITE_API + '/api/auth/me', {
      credentials: 'include'
    })
    .then(r=>r.json())
    .then(data => setUser(data.user));
  }, []);

  return (
    <div style={{maxWidth:800, margin:'0 auto', padding:20}}>
      <h2>Video App</h2>
      {!user ? (
        <>
          <Register />
          <hr />
          <Login onLogin={()=> window.location.reload()} />
        </>
      ) : (
        <>
          <div style={{marginBottom:12}}>
            مرحبًا، {user.username} &nbsp;
            <button onClick={()=>{
              fetch(import.meta.env.VITE_API + '/api/auth/logout', { method:'POST', credentials:'include' })
                .then(()=> window.location.reload());
            }}>تسجيل خروج</button>
          </div>
          <Upload />
          <VideoList />
        </>
      )}
    </div>
  );
}

export default App;
