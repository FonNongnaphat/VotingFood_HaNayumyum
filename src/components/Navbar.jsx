import React from 'react';

/**
 * Navbar Component
 * @param {string} currentTab - แท็บปัจจุบัน ('manage' | 'vote')
 * @param {function} onTabChange - ฟังก์ชันสลับแท็บ
 * @param {function} onResetVotes - ฟังก์ชันรีเซ็ตคะแนนโหวตทั้งหมด
 * @param {number} totalMenus - จำนวนเมนูทั้งหมดที่มีในระบบ
 */
export default function Navbar({ currentTab, onTabChange, onResetVotes, totalMenus }) {
  const handleResetClick = () => {
    if (totalMenus === 0) return;
    const confirmReset = window.confirm(
      'ต้องการรีเซ็ตคะแนนโหวตทั้งหมดเพื่อเริ่มรอบใหม่ใช่หรือไม่? (รายการเมนูจะยังอยู่ครบ)'
    );
    if (confirmReset) {
      onResetVotes();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* โลโก้และชื่อโปรเจกต์ */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl" role="img" aria-label="lunch bowl">
            🍲
          </span>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-none">กินไรดี?</h1>
            <p className="text-xs text-slate-500 font-medium">Food & Drink Voting</p>
          </div>
        </div>

        {/* ปุ่มสลับแท็บหน้าจอ */}
        <nav className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onTabChange('vote')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentTab === 'vote'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            กระดานโหวต
          </button>
          <button
            type="button"
            onClick={() => onTabChange('manage')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentTab === 'manage'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            จัดการเมนู
          </button>
        </nav>

        {/* ปุ่มรีเซ็ตคะแนนโหวต */}
        <div>
          <button
            type="button"
            onClick={handleResetClick}
            disabled={totalMenus === 0}
            className="text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            title="ล้างคะแนนโหวตทั้งหมดเพื่อเริ่มวันใหม่"
          >
            รีเซ็ตคะแนน
          </button>
        </div>
      </div>
    </header>
  );
}