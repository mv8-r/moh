import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';

export default function VideoList() {
  const [list,setList] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(()=> {
    fetch(import.meta.env.VITE_API + '/api/videos', { credentials: 'include' })
      .then(r=>r.json()).then(setList).catch(()=>setList([]));
  }, []);

  return (
    <div>
      <h3>قائمة الفيديوهات</h3>
      <ul>
        {list.map(v => (
          <li key={v._id} style={{marginBottom:8}}>
            {v.title} &nbsp;
            <button onClick={()=>setActive(v._id)}>شاهد</button>
          </li>
        ))}
      </ul>
      {active && <VideoPlayer id={active} />}
    </div>
  );
}
