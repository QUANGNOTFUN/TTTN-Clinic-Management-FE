export const getWeekDates = (date?: Date): Date[] => {
	const now = date ?? new Date();
	now.setUTCHours(0, 0, 0, 0);
	now.setUTCMinutes(now.getUTCMinutes() + 7 * 60);
	
	const dayOfWeek = now.getUTCDay();
	const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
	const monday = new Date(now);
	monday.setUTCDate(now.getUTCDate() + diffToMonday);
	
	const weekDates: Date[] = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date(monday.getTime() + i * 24 * 60 * 60 * 1000);
		weekDates.push(date);
	}
	
	return weekDates;
}

export const getISOWeekDates = (
	date?: Date, shift: 'MORNING' | 'AFTERNOON' | 'OVERTIME' = undefined
): string[] => {
	const now = date;
	if(!shift) return;
	now.setHours(8, 0, 0, 0);
	now.setMinutes(now.getUTCMinutes() + 7 * 60);
	
	const dayOfWeek = now.getUTCDay();
	const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
	const monday = new Date(now);
	monday.setUTCDate(now.getUTCDate() + diffToMonday);
	
	const weekDates: string[] = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date(monday.getTime() + i * 24 * 60 * 60 * 1000);
		const formattedDate = date.toISOString()
		weekDates.push(formattedDate);
	}
	
	return weekDates;
}