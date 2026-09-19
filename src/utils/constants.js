// Storage Keys สำหรับจัดการ Local Storage
export const STORAGE_KEYS = {
  MENUS: 'FOOD_VOTE_MENUS',
  HAS_VOTED: 'FOOD_VOTE_HAS_VOTED',
};

// ไอคอนสุ่มสำหรับอาหารและเครื่องดื่ม (Fallback เมื่อไม่มีรูป)
export const FOOD_ICONS = [
  '🍜', '🍱', '🍛', '🍲', '🍣', '🍕', '🍔', '🌮',
  '🥗', '🍝', '🥪', '🧋', '☕', '🥤', '🍵', '🍉'
];

/**
 * สุ่มไอคอนอาหาร/เครื่องดื่ม 1 รายการ
 * @returns {string} Emoji icon
 */
export const getRandomFoodIcon = () => {
  const index = Math.floor(Math.random() * FOOD_ICONS.length);
  return FOOD_ICONS[index];
};