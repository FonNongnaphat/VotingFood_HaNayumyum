import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ManageMenuPage from './components/ManageMenuPage';
import VotingBoardPage from './components/VotingBoardPage';
import { STORAGE_KEYS } from './utils/constants';

export default function App() {
  // สลับแท็บหน้าจอ: 'vote' หรือ 'manage'
  const [currentTab, setCurrentTab] = useState('vote');

  // โหลดรายการเมนูจาก Local Storage (Lazy Initialization)
  const [menus, setMenus] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENUS);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading menus from localStorage:', error);
      return [];
    }
  });

  // โหลดสถานะว่าเครื่องนี้โหวตไปแล้วหรือยัง
  const [hasVoted, setHasVoted] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.HAS_VOTED) === 'true';
    } catch {
    return false;
    }
  });

  // ซิงค์ menus ลง Local Storage ทุกครั้งที่มีการเปลี่ยนแปลง
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MENUS, JSON.stringify(menus));
    } catch (error) {
      console.error('Error saving menus to localStorage:', error);
    }
  }, [menus]);

  // ซิงค์สถานะ hasVoted ลง Local Storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HAS_VOTED, String(hasVoted));
    } catch (error) {
      console.error('Error saving vote status to localStorage:', error);
    }
  }, [hasVoted]);

  // ฟังก์ชันเพิ่มเมนูใหม่
  const handleAddMenu = (newMenu) => {
    setMenus((prev) => [newMenu, ...prev]);
    // เพิ่มเสร็จแล้วสลับไปหน้ากระดานโหวตให้ทันที
    setCurrentTab('vote');
  };

  // ฟังก์ชันลบเมนูรายตัว
  const handleDeleteMenu = (menuId) => {
    const confirmDelete = window.confirm('ยืนยันการลบเมนูนี้ออกจากรายการ?');
    if (confirmDelete) {
      setMenus((prev) => prev.filter((item) => item.id !== menuId));
    }
  };

  // ฟังก์ชันลงคะแนนโหวต (Guard: 1 คน 1 โหวต)
  const handleVote = (menuId) => {
    if (hasVoted) return;

    setMenus((prev) =>
      prev.map((item) =>
        item.id === menuId ? { ...item, votes: (item.votes || 0) + 1 } : item
      )
    );
    setHasVoted(true);
  };

  // ฟังก์ชันรีเซ็ตเฉพาะคะแนนโหวต (คงรายการเมนูเดิมไว้)
  const handleResetVotes = () => {
    setMenus((prev) => prev.map((item) => ({ ...item, votes: 0 })));
    setHasVoted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header & Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onResetVotes={handleResetVotes}
        totalMenus={menus.length}
      />

      {/* Main Container แสดงผลตาม Tab */}
      <main className="flex-1">
        {currentTab === 'vote' ? (
          <VotingBoardPage
            menus={menus}
            hasVoted={hasVoted}
            onVote={handleVote}
            onGoToManage={() => setCurrentTab('manage')}
          />
        ) : (
          <ManageMenuPage
            menus={menus}
            onAddMenu={handleAddMenu}
            onDeleteMenu={handleDeleteMenu}
          />
        )}
      </main>

      {/* Footer เรียบง่าย */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400 bg-white">
        Local-First Voting System • ข้อมูลถูกบันทึกบนเครื่องของคุณผ่าน Local Storage
      </footer>
    </div>
  );
}