import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ManageMenuPage from './components/ManageMenuPage';
import VotingBoardPage from './components/VotingBoardPage';
import RecommendedMenuPage from './components/RecommendedMenuPage'; // นำเข้าหน้าที่สร้างใหม่
import { STORAGE_KEYS } from './utils/constants';

export default function App() {
  // สลับแท็บหน้าจอ: 'vote', 'manage', หรือ 'recommend'
  const [currentTab, setCurrentTab] = useState('vote');

  const [menus, setMenus] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENUS);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading menus from localStorage:', error);
      return [];
    }
  });

  const [hasVoted, setHasVoted] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.HAS_VOTED) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MENUS, JSON.stringify(menus));
    } catch (error) {
      console.error('Error saving menus to localStorage:', error);
    }
  }, [menus]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HAS_VOTED, String(hasVoted));
    } catch (error) {
      console.error('Error saving vote status to localStorage:', error);
    }
  }, [hasVoted]);

  const handleAddMenu = (newMenu) => {
    setMenus((prev) => [newMenu, ...prev]);
    setCurrentTab('vote');
  };

  const handleDeleteMenu = (menuId) => {
    const confirmDelete = window.confirm('ยืนยันการลบเมนูนี้ออกจากรายการ?');
    if (confirmDelete) {
      setMenus((prev) => prev.filter((item) => item.id !== menuId));
    }
  };

  const handleVote = (menuId) => {
    setMenus((prev) =>
      prev.map((item) =>
        item.id === menuId ? { ...item, votes: (item.votes || 0) + 1 } : item
      )
    );
  };

  const handleResetVotes = () => {
    setMenus((prev) => prev.map((item) => ({ ...item, votes: 0 })));
    setHasVoted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onResetVotes={handleResetVotes}
        totalMenus={menus.length}
      />

      <main className="flex-1">
        {currentTab === 'vote' && (
          <VotingBoardPage
            menus={menus}
            hasVoted={false}
            onVote={handleVote}
            onGoToManage={() => setCurrentTab('manage')}
          />
        )}
        {currentTab === 'manage' && (
          <ManageMenuPage
            menus={menus}
            onAddMenu={handleAddMenu}
            onDeleteMenu={handleDeleteMenu}
          />
        )}
        {/* เพิ่มเงื่อนไขการเรนเดอร์หน้าเมนูแนะนำ */}
        {currentTab === 'recommend' && (
          <RecommendedMenuPage onAddMenu={handleAddMenu} />
        )}
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400 bg-white">
        Local-First Voting System • ข้อมูลถูกบันทึกบนเครื่องของคุณผ่าน Local Storage
      </footer>
    </div>
  );
}