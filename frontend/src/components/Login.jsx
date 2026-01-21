import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const login = async () => {
    const res = await fetch(import.meta.env.VITE_API + '/api/auth/login', {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });
    const data = await res.json();
    if (res.ok) onLogin && onLogin();
    else alert(data.message || 'خطأ');
  };
  return (
    <div>
      <h3>تسجيل دخول</h3>
      <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
      <br />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <br />
      <button onClick={login}>دخول</button>
    </div>
  );
}
