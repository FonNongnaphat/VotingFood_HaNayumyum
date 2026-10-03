import { useState } from 'react';

/**
 * MenuVoteCard Component
 * @param {object} item - ข้อมูลเมนู (id, name, price, imageBase64, placeholderIcon, votes)
 * @param {number} totalVotes - ยอดรวมคะแนนโหวตของทุกเมนู
 * @param {boolean} hasVoted - สถานะว่าเบราว์เซอร์นี้ทำการโหวตไปแล้วหรือไม่
 * @param {function} onVote - ฟังก์ชันยิงคะแนนโหวต (item.id)
 */
export default function MenuVoteCard({ item, totalVotes, hasVoted, onVote }) {
  const [imgError, setImgError] = useState(false);

  // คำนวณเปอร์เซ็นต์คะแนนโหวต
  const votePercentage = totalVotes > 0 
    ? Math.round((item.votes / totalVotes) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
      <div>
        {/* ส่วนรูปภาพ หรือ Fallback Icon */}
        <div className="relative w-full h-44 bg-slate-100 flex items-center justify-center overflow-hidden">
          {item.imageBase64 && !imgError ? (
            <img
              src={item.imageBase64}
              alt={item.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-300 select-none">
              <span className="text-5xl mb-1">{item.placeholderIcon}</span>
              <span className="text-xs text-slate-400 font-medium">ไม่มีรูปภาพ</span>
            </div>
          )}

          {/* ป้ายราคา */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm border border-slate-100">
            {item.price > 0 ? `฿${item.price.toLocaleString()}` : 'ฟรี / ไม่ระบุ'}
          </div>
        </div>

        {/* ส่วนข้อมูลเมนู */}
        <div className="p-4">
          <h3 
            className="font-bold text-slate-800 text-base leading-snug line-clamp-2" 
            title={item.name}
          >
            {item.name}
          </h3>

          {/* สถิติคะแนนโหวตและเปอร์เซ็นต์ */}
          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
            <span>คะแนน: <strong className="text-slate-800 text-sm">{item.votes}</strong></span>
            <span className="text-orange-600 font-bold">{votePercentage}%</span>
          </div>

          {/* แถบ Progress Bar แอนิเมชันเลื่อนขยาย */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-orange-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${votePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* ปุ่มกดโหวต */}
      <div className="p-4 pt-0">
        <button
          type="button"
          onClick={() => onVote(item.id)}
          disabled={hasVoted}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            hasVoted
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white shadow-sm hover:shadow'
          }`}
        >
          <span>🗳️</span>
          {hasVoted ? 'โหวตแล้ว' : 'โหวตเมนูนี้'}
        </button>
      </div>
    </div>
  );
}