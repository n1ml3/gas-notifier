// Lấy dữ liệu từ node HTML trước đó
const input = $json;
const results = [];

// Đảm bảo dữ liệu tồn tại và là mảng
const ten_loai = input.ten_loai || [];
const gia_vung_1 = input.gia_vung_1 || [];

// Chúng ta chạy vòng lặp theo số lượng tên loại xăng dầu (thường có 6 loại chính)
for (let i = 0; i < ten_loai.length; i++) {
  
  // Chỉ lấy nếu có giá tương ứng (để tránh lỗi undefined)
  if (ten_loai[i] && gia_vung_1[i]) {
    
    // Làm sạch tên: Xóa phần URL [https://...] trong chuỗi
    let cleanName = ten_loai[i].split('[')[0].trim();
    
    // Chỉ lấy các loại xăng dầu thực sự (loại bỏ các mã ngoại tệ nếu nó bị dính vào)
    if (cleanName !== "USD" && cleanName !== "EUR" && cleanName !== "GBP" && !cleanName.includes("Đơn vị")) {
      results.push({
        ten: cleanName,
        gia: gia_vung_1[i].trim()
      });
    }
  }
}

// Tìm riêng xăng RON 95-III để báo cáo nhanh
const ron95 = results.find(item => item.ten.includes('RON 95-III'));

// Trả về kết quả: Nếu tìm thấy RON 95 thì trả về nó, không thì trả về cả bảng đã sạch
return ron95 ? ron95 : results;