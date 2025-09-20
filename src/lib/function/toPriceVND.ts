export const toPriceVND = (price: number) => {
	if (isNaN(price)) return "0 ₫"; // Tránh lỗi khi truyền dữ liệu không hợp lệ
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
		minimumFractionDigits: 0, // không có số lẻ
	}).format(price);
};
