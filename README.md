# 🍲 VotingFood_HaNayumyum (กินไรดี?)

เว็บแอปพลิเคชันช่วยตัดสินใจและลงคะแนนเลือกเมนูอาหาร/เครื่องดื่มประจำวันสำหรับกลุ่มเพื่อนหรือเพื่อนร่วมงานในออฟฟิศ เพื่อแก้ปัญหา **"มื้อนี้กินอะไรดี?"** ออกแบบตามแนวทาง **Local-First Architecture** ไม่ต้องติดตั้ง Database ภายนอก ข้อมูลถูกจัดเก็บบนเครื่องของผู้ใช้ทันที

---

## ✨ คุณสมบัติเด่น (Features)

* **🍽️ จัดการรายการเมนู (Menu Management):**
  * เพิ่มเมนูอาหารและเครื่องดื่ม กำหนดราคาได้ตามต้องการ
  * ระบบ **Client-side Image Compression** ย่อขนาดภาพผ่าน HTML5 Canvas API ก่อนแปลงเป็น Base64 ป้องกันปัญหา `localStorage` เต็ม
  * สุ่มไอคอนอิโมจิอาหารอัตโนมัติ (Placeholder Icon) เมื่อไม่มีการอัปโหลดรูปภาพ
  * ระบบยืนยันก่อนลบเมนูรายตัว
* **🗳️ กระดานลงคะแนน (Voting Board):**
  * แสดงผลในรูปแบบ Responsive Grid รองรับทั้งมือถือ แท็บเล็ต และจอคอมพิวเตอร์
  * แสดงคะแนนแบบเรียลไทม์ พร้อมแถบเปอร์เซ็นต์ (Percentage Progress Bar)
  * รองรับทั้งการโหวตแบบจำกัดสิทธิ์ (1 เครื่อง 1 สิทธิ์) หรือโหมดตู้กดโหวตส่วนกลาง (Kiosk Mode)
* **🔄 รีเซ็ตผลคะแนน (Reset Votes):**
  * ปุ่มเคลียร์ผลคะแนนกลับเป็น 0 เพื่อเริ่มมื้อถัดไป โดยไม่ลบรายการเมนูที่เคยสร้างไว้
* **💾 Local-First Persistence:**
  * ซิงค์ข้อมูลอัตโนมัติลงใน `localStorage` ของเว็บเบราว์เซอร์ ปิดแท็บหรือรีเฟรชหน้าจอข้อมูลไม่สูญหาย

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack & Dependencies)

อ้างอิงตาม `package.json` ของโปรเจกต์:

* **Frontend Framework:** React `v19.2.8` & React DOM `v19.2.8`
* **Build Tool:** Vite `v8.3.0`
* **CSS Framework:** Tailwind CSS `v4.3.3` ร่วมกับ `@tailwindcss/vite` `v4.3.3`
* **Linting & Code Quality:** ESLint `v10.10.0`
* **Storage & Processing:** Web Storage API (`localStorage`), HTML5 Canvas API

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
VotingFood_HaNayumyum/
├── public/
├── src/
│   ├── components/
│   │   ├── CreateMenuForm.jsx    # แบบฟอร์มเพิ่มเมนูและย่อขนาดภาพ
│   │   ├── ManageMenuPage.jsx    # หน้าจัดการและลบเมนู
│   │   ├── MenuVoteCard.jsx      # การ์ดแสดงผลเมนูและแถบคะแนนโหวต
│   │   ├── Navbar.jsx            # เมนูด้านบน สลับแท็บ และปุ่มรีเซ็ตคะแนน
│   │   └── VotingBoardPage.jsx   # หน้ากระดานลงคะแนน
│   ├── utils/
│   │   ├── constants.js          # คีย์ LocalStorage และรายการไอคอนสำรอง
│   │   └── imageCompressor.js    # ฟังก์ชันย่อขนาดไฟล์รูปภาพผ่าน Canvas
│   ├── App.jsx                   # Component หลักและ State Management
│   ├── index.css                 # สไตล์ชีตหลัก (@import "tailwindcss";)
│   └── main.jsx                  # จุด Mount React DOM
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 ขั้นตอนการติดตั้งและเริ่มต้นใช้งาน (Installation Guide)

### 1. สิ่งที่ต้องเตรียมก่อนติดตั้ง (Prerequisites)
* ติดตั้ง [Node.js](https://nodejs.org/) (แนะนำเวอร์ชัน 20 หรือ 22 ขึ้นไป)
* Git สำหรับจัดการโค้ด

### 2. โคลนโปรเจกต์ (Clone Repository)
เปิด Terminal หรือ Command Prompt แล้วพิมพ์:
```bash
git clone https://github.com/FonNongnaphat/VotingFood_HaNayumyum.git
cd VotingFood_HaNayumyum
```

### 3. ติดตั้งไลบรารีและ Dependencies
ติดตั้งแพ็กเกจทั้งหมดตามที่ระบุใน `package.json`:
```bash
npm install
```

### 4. ตรวจสอบการตั้งค่า (Configuration Check)

* **ไฟล์ `vite.config.js`:** ต้องมีการเปิดใช้งานปลั๊กอิน Tailwind CSS v4:
  ```javascript
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [
      react(),
      tailwindcss(),
    ],
  })
  ```

* **ไฟล์ `src/index.css`:** มีการนำเข้า Tailwind CSS สั้นๆ เพียงบรรทัดเดียว:
  ```css
  @import "tailwindcss";
  ```

### 5. สั่งรันโปรเจกต์ (Development Server)

รันเพื่อใช้งานเฉพาะในเครื่องคอมพิวเตอร์ของคุณ:
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่: `http://localhost:5173/`

---

## 📱 การแชร์ให้เพื่อนในออฟฟิศเข้าใช้งาน (Local Network Access)

หากต้องการให้เพื่อนร่วมงานที่เชื่อมต่อ Wi-Fi เดียวกันสามารถเปิดผ่านโทรศัพท์มือถือหรือโน้ตบุ๊ก:

1. สั่งรันด้วยพารามิเตอร์ `--host`:
   ```bash
   npm run dev -- --host
   ```
2. Terminal จะแสดง URL สำหรับเครือข่ายวงแลน เช่น:
   ```text
   ➜  Local:   http://localhost:5173/
   ➜  Network: http://192.168.1.XX:5173/
   ```
3. ส่งลิงก์ `http://192.168.1.XX:5173/` ให้เพื่อนเข้าใช้งานได้ทันที

---

## 📜 คำสั่ง Scripts เพิ่มเติม (Available Scripts)

* `npm run dev` — รัน Development Server
* `npm run build` — รวมไฟล์โค้ด (Bundle) สำหรับเตรียมนำขึ้น Production
* `npm run preview` — พรีวิวไฟล์ Build ก่อน Deploy จริง
* `npm run lint` — ตรวจสอบข้อผิดพลาดของโค้ดด้วย ESLint

---