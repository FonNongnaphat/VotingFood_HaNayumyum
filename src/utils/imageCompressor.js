/**
 * Utility สำหรับบีบอัดไฟล์รูปภาพผ่าน HTML5 Canvas และแปลงเป็น Base64
 * @param {File} file - ไฟล์รูปภาพต้นทาง
 * @param {number} maxWidth - ความกว้างสูงสุด (default: 600px)
 * @param {number} quality - คุณภาพ JPEG 0 - 1 (default: 0.7)
 * @returns {Promise<string>} Base64 string ของภาพที่บีบอัดแล้ว
 */
export const compressImage = (file, maxWidth = 600, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('กรุณาเลือกไฟล์ที่เป็นรูปภาพเท่านั้น'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // ปรับขนาด Scale Down ให้ไม่เกิน maxWidth โดยคงสัดส่วนเดิม (Aspect Ratio)
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Export เป็น Base64 ในรูปแบบ image/jpeg
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };

      img.onerror = (error) => reject(error);
    };

    reader.onerror = (error) => reject(error);
  });
};