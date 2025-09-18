export function toVnISOString(date: Date) {
	const VN_OFFSET = 7 * 60; // phút
	const local = new Date(date.getTime() + VN_OFFSET * 60 * 1000);
	return local.toISOString().slice(0, -1) + "Z";
}