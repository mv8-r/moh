import React, { useState } from 'react';

export default function Upload() {
  const [file,setFile] = useState(null);
  const [title,setTitle] = useState('');
  const upload = async () => {
    if (!file) return alert('اختر ملف');
    const fd = new FormData();
    fd.append('video', file);
    fd.append('title', title);
    const res = await fetch(import.meta.env.VITE_API + '/api/videos/upload', {
      method: 'POST',
      body: fd,
      credentials: 'include'
    });
    const data = await res.json();
    alert(data.message || 'done');
  };
  return (
    <div style={{marginTop:16, marginBottom:16}}>
      <h3>رفع فيديو</h3>
      <input placeholder="عنوان" value={title} onChange={e=>setTitle(e.target.value)} />
      <br />
      <input type="file" accept="video/*" onChange={e=>setFile(e.target.files[0])} />
      <br />
      <button onClick={upload}>رفع</button>
    </div>
  );
}
