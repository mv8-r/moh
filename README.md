# Video-auth-app (Backend + Frontend example)

هذا المشروع عبارة عن نظام مبسّط لرفع فيديوهات ومشاهدتها بعد تسجيل الدخول.

ملخص:
- Backend: Node.js + Express + MongoDB (Mongoose)
- المصادقة: JWT محفوظ في Cookie HttpOnly
- رفع الفيديو: multer (تخزين محلي كمثال)
- Streaming: دعم Range headers لعنصر <video>

تشغيل Backend:
1. انسخ ملفات الـ backend إلى مجلد جديد.
2. أنشئ `.env` من `.env.example` وضبط القيم.
3. npm install
4. npm run dev
5. تأكد من تشغيل MongoDB محليًا أو عبر URI صالح.

Frontend (Vite + React):
- يوجد مجلد frontend مع مكونات React في هذه المجموعة (انسخها إلى مشروع Vite).
- تأكد من ضبط VITE_API في ملف .env للواجهة (مثلاً VITE_API=http://localhost:4000).

ملاحظات أمنيّة:
- في الإنتاج استخدم HTTPS مع `secure: true` للكوكي.
- خزن الفيديوهات في S3 أو خدمة مخصصة، ووفّر signed URLs أو proxy مع تحقق.
- ضع حدود للحجم ونوع الملف وخطّة تخزين / حذف.
