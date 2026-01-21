import React, { useState } from 'react';

export default function Register() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const register = async () => {
    const res = await fetch(import.meta.env.VITE_API + '/api/auth/register', {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });
    const data = await res.json();
    alert(data.message || 'done');
  };
  return (
    <div>
      <h3>التسجيل</h3>
      <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
      <br />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <br />
      <button onClick={register}>تسجيل</button>
    </div>
  );
}
