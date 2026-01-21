import React from 'react';

export default function VideoPlayer({ id }) {
  const src = import.meta.env.VITE_API + '/api/videos/stream/' + id;

  return (
    <div style={{marginTop:12}}>
      <h4>مشغل الفيديو</h4>
      <video
        controls
        width="720"
        src={src}
        crossOrigin="use-credentials" // مهم لإرسال الكوكي عند cross-origin
      />
      <p>ملاحظة: المتصفح يرسل الكوكي فقط إذا كان الـ backend يسمح بالـ credentials وملف الـ cookie مضبوط بإعدادات مناسبة.</p>
    </div>
  );
}
