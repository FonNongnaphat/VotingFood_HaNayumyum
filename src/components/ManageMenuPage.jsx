import React from 'react';
import CreateMenuForm from './CreateMenuForm';

/**
 * ManageMenuPage Component
 * @param {Array} menus - รายการเมนูทั้งหมด
 * @param {function} onAddMenu - ส่งต่อฟังก์ชันเพิ่มเมนู
 * @param {function} onDeleteMenu - ฟังก์ชันลบเมนูตาม id
 */
export default function ManageMenuPage({ menus, onAddMenu, onDeleteMenu }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">จัดการรายการเมนู</h2>
        <p className="text-sm text-slate-500 mt-1">
          เพิ่มตัวเลือกอาหารและเครื่องดื่มที่ต้องการเปิดโหวตในออฟฟิศวันนี้
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* คอลัมน์ซ้าย: ฟอร์มเพิ่มเมนู */}
        <div className="lg:col-span-5">
          <CreateMenuForm onAddMenu={onAddMenu} />
        </div>

        {/* คอลัมน์ขวา: รายการเมนูทั้งหมด */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <span>📋</span> รายการเมนูที่มีอยู่
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
              ทั้งหมด {menus.length} รายการ
            </span>
          </div>

          {menus.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <span className="text-4xl block mb-2">🍽️</span>
              <p className="text-sm">ยังไม่มีเมนูในระบบ</p>
              <p className="text-xs text-slate-400 mt-1">
                กรอกข้อมูลทางด้านซ้ายเพื่อเริ่มสร้างตัวเลือกแรกได้เลย
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 max-h-[520px] overflow-y-auto pr-1">
              {menus.map((item) => (
                <li key={item.id} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* แสดงรูปขนาดย่อ หรือ Fallback Emoji Icon */}
                    {item.imageBase64 ? (
                      <img
                        src={item.imageBase64}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-xl shrink-0">
                        {item.placeholderIcon}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="font-medium text-slate-800 text-sm truncate" title={item.name}>
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.price > 0 ? `฿${item.price.toLocaleString()}` : 'ฟรี / ไม่ระบุราคา'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteMenu(item.id)}
                    className="shrink-0 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="ลบเมนูนี้"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}