import React from 'react';
import { getRandomFoodIcon } from '../utils/constants';

// เพิ่มฟิลด์ image ใส่ลิงก์รูปภาพตัวอย่างเข้าไป (ใช้รูปฟรีจาก Unsplash ให้ชั่วคราวก่อนครับ)
const RECOMMENDED_MENUS = [
  { 
    name: 'ผัดกะเพราหมูสับไข่ดาว', 
    price: 60, 
    tag: 'ตามสั่งยอดฮิต',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    name: 'สเต็ก / ของย่าง', 
    price: 150, 
    tag: 'สายเนื้อ',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    name: 'ส้มตำ - ไก่ย่าง', 
    price: 120, 
    tag: 'รสจัดจ้าน',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    name: 'ก๋วยเตี๋ยว / ราเมน', 
    price: 60, 
    tag: 'เส้น',
    image: 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=400' 
  },
  { 
    name: 'ชาบู / หมูกระทะ', 
    price: 299, 
    tag: 'จัดหนัก',
    image: 'https://images.unsplash.com/photo-1625938146369-adc83368bda7?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    name: 'อาหารคลีน / สลัด', 
    price: 80, 
    tag: 'สุขภาพ',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80' 
  },
];

export default function RecommendedMenuPage({ onAddMenu }) {
  const handleAddRecommended = (menu) => {
    const newMenuItem = {
      id: crypto.randomUUID(),
      name: menu.name,
      price: menu.price,
      // ยัดลิงก์รูปภาพใส่ imageBase64 ไปเลย ระบบเดิมใน VotingBoard จะแสดงผลได้ปกติ
      imageBase64: menu.image, 
      placeholderIcon: getRandomFoodIcon(),
      votes: 0,
      createdAt: Date.now(),
    };
    onAddMenu(newMenuItem);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <span>💡</span> ไอเดียเมนูแนะนำ
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          คิดไม่ออกใช่ไหม? เลือกเมนูยอดฮิตด้านล่างนี้เพิ่มเข้ากระดานโหวตได้เลย
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {RECOMMENDED_MENUS.map((menu, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md hover:border-orange-300 transition-all group"
          >
            {/* ส่วนรูปภาพ */}
            <div className="h-32 w-full overflow-hidden bg-slate-100 relative">
              <img 
                src={menu.image} 
                alt={menu.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-bold rounded-lg shadow-sm">
                {menu.tag}
              </div>
            </div>

            {/* ส่วนข้อความและปุ่ม */}
            <div className="p-3 flex flex-col flex-1 justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-800 text-sm leading-tight line-clamp-2">
                  {menu.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">~ {menu.price} บาท</p>
              </div>
              
              <button
                onClick={() => handleAddRecommended(menu)}
                className="w-full bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white px-3 py-2 rounded-xl text-xs font-semibold transition-colors shadow-sm"
              >
                + เพิ่มลงโหวต
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}