import { useState } from 'react';
import { compressImage } from '../utils/imageCompressor';
import { getRandomFoodIcon } from '../utils/constants';

/**
 * นับจำนวนคำจากข้อความ
 * @param {string} text 
 * @returns {number}
 */
const countWords = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
};

/**
 * CreateMenuForm Component
 * @param {function} onAddMenu - ฟังก์ชันส่งต่อเมนูใหม่ขึ้นไปยัง Parent State
 */
export default function CreateMenuForm({ onAddMenu }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const wordCount = countWords(name);
  const isWordLimitExceeded = wordCount > 20;

  // จัดการการเปลี่ยนรูปภาพและทำการบีบอัด
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      setErrorMessage('');
      const compressed = await compressImage(file, 600, 0.7);
      setImageBase64(compressed);
      setImagePreview(compressed);
    } catch (err) {
      setErrorMessage(err.message || 'เกิดข้อผิดพลาดในการประมวลผลรูปภาพ');
      setImageBase64(null);
      setImagePreview(null);
    } finally {
      setIsCompressing(false);
    }
  };

  // ลบรูปภาพที่เลือก
  const handleRemoveImage = () => {
    setImageBase64(null);
    setImagePreview(null);
  };

  // จัดการการกรอกราคา: บังคับไม่ให้ติดลบ (ถ้าติดลบหรือแปลงไม่ได้ให้กลายเป็น 0)
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setPrice('');
      return;
    }
    const num = Number(value);
    setPrice(Math.max(0, num).toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('กรุณากรอกชื่อเมนู');
      return;
    }

    if (isWordLimitExceeded) {
      setErrorMessage('ชื่อเมนูต้องยาวไม่เกิน 20 คำ');
      return;
    }

    const finalPrice = price === '' ? 0 : Math.max(0, Number(price));

    const newMenuItem = {
      id: crypto.randomUUID(),
      name: name.trim(),
      price: finalPrice,
      imageBase64: imageBase64,
      placeholderIcon: getRandomFoodIcon(),
      votes: 0,
      createdAt: Date.now(),
    };

    onAddMenu(newMenuItem);

    // รีเซ็ตฟอร์ม
    setName('');
    setPrice('');
    setImageBase64(null);
    setImagePreview(null);
    setErrorMessage('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span>➕</span> เพิ่มเมนูใหม่สำหรับเปิดโหวต
      </h2>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-sm text-rose-600">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ชื่อเมนู */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="menu-name" className="text-sm font-semibold text-slate-700">
              ชื่อเมนู / ร้านอาหาร <span className="text-rose-500">*</span>
            </label>
            <span
              className={`text-xs font-medium ${
                isWordLimitExceeded ? 'text-rose-500 font-bold' : 'text-slate-400'
              }`}
            >
              {wordCount} / 20 คำ
            </span>
          </div>
          <input
            id="menu-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="เช่น ข้าวมันไก่ตอนพิเศษ, ชานมไข่มุกหวานน้อย"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all duration-150 ${
              isWordLimitExceeded
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-200 focus:border-orange-500 focus:ring-orange-100'
            }`}
          />
        </div>

        {/* ราคา */}
        <div>
          <label htmlFor="menu-price" className="block text-sm font-semibold text-slate-700 mb-1">
            ราคาโดยประมาณ (บาท) <span className="text-xs font-normal text-slate-400">(ไม่ใส่ = 0)</span>
          </label>
          <input
            id="menu-price"
            type="number"
            min="0"
            step="1"
            value={price}
            onChange={handlePriceChange}
            placeholder="0"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-150"
          />
        </div>

        {/* อัปโหลดรูปภาพ */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            รูปภาพประกอบ <span className="text-xs font-normal text-slate-400">(ถ้ามี ระบบจะย่อขนาดอัตโนมัติ)</span>
          </label>

          {imagePreview ? (
            <div className="relative inline-block mt-1">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-xl border border-slate-200 shadow-inner"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:bg-rose-600 transition-colors"
                title="ลบรูปภาพ"
              >
                ✕
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-all duration-150">
              <div className="flex flex-col items-center justify-center text-slate-400">
                <span className="text-2xl mb-1">📷</span>
                <span className="text-xs font-medium">
                  {isCompressing ? 'กำลังบีบอัดรูปภาพ...' : 'คลิกเพื่ออัปโหลดรูปภาพ'}
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isCompressing}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* ปุ่มบันทึกเมนู */}
        <button
          type="submit"
          disabled={isCompressing || isWordLimitExceeded}
          className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          เพิ่มเมนูเข้ากระดานโหวต
        </button>
      </form>
    </div>
  );
}