export function getNowUTC7(): Date {
	const now = new Date();
	// Giờ VN = UTC + 7
	return new Date(now.getTime() + (7 * 60 - now.getTimezoneOffset()) * 60000);
}