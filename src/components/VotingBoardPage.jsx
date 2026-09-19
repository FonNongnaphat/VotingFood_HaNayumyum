import { useState } from 'react';
import MenuVoteCard from './MenuVoteCard';

/**
 * VotingBoardPage Component
 * @param {Array} menus - รายการเมนูทั้งหมด
 * @param {boolean} hasVoted - สถานะการโหวตของเครื่องปัจจุบัน
 * @param {function} onVote - ฟังก์ชันส่งคะแนนโหวต
 * @param {function} onGoToManage - ฟังก์ชันสลับไปหน้าเพิ่มเมนู (กรณีไม่มีเมนู)
 */
export default function VotingBoardPage({ menus, hasVoted, onVote, onGoToManage }) {
  // คำนวณผลรวมคะแนนโหวตทั้งหมด
  const totalVotes = menus.reduce((sum, item) => sum + (item.votes || 0), 0);

  // เรียงลำดับเมนูตามคะแนนโหวตจากมากไปน้อย
  const sortedMenus = [...menus].sort((a, b) => (b.votes || 0) - (a.votes || 0));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* ส่วนหัวหน้ากระดานโหวตและสถิติ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">กระดานเปิดโหวตวันนี้</h2>
          <p className="text-sm text-slate-500 mt-1">
            ร่วมกันตัดสินใจเมนูมื้อนี้ กติกา: 1 คนสามารถโหวตได้ 1 เมนูเท่านั้น
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm shrink-0 self-start sm:self-auto">
          <span className="text-2xl">🗳️</span>
          <div>
            <p className="text-xs text-slate-400 font-medium">คะแนนโหวตรวม</p>
            <p className="text-lg font-bold text-slate-800 leading-tight">
              {totalVotes.toLocaleString()} <span className="text-xs font-normal text-slate-500">เสียง</span>
            </p>
          </div>
        </div>
      </div>

      {/* Banner แจ้งเตือนเมื่อผู้ใช้ลงคะแนนแล้ว */}
      {hasVoted && (
        <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-sm animate-fade-in">
          <span className="text-xl">✅</span>
          <div>
            <p className="font-bold">คุณได้ใช้สิทธิ์ลงคะแนนโหวตเรียบร้อยแล้ว</p>
            <p className="text-xs text-emerald-600 mt-0.5">
              สามารถรอดูผลคะแนนแบบเรียลไทม์ได้ที่แถบเปอร์เซ็นต์ด้านล่าง
            </p>
          </div>
        </div>
      )}

      {/* กรณีที่ยังไม่มีรายการเมนูให้โหวต */}
      {menus.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm max-w-md mx-auto">
          <span className="text-5xl block mb-3">🍽️</span>
          <h3 className="text-base font-bold text-slate-800">ยังไม่มีเมนูให้เปิดโหวต</h3>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            เริ่มต้นด้วยการเพิ่มรายชื่ออาหารหรือเครื่องดื่มก่อนเปิดห้องโหวต
          </p>
          <button
            type="button"
            onClick={onGoToManage}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
          >
            ไปที่หน้าจัดการเมนู
          </button>
        </div>
      ) : (
        /* Grid รายการเมนู */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMenus.map((item) => (
            <MenuVoteCard
              key={item.id}
              item={item}
              totalVotes={totalVotes}
              hasVoted={hasVoted}
              onVote={onVote}
            />
          ))}
        </div>
      )}
    </div>
  );
}