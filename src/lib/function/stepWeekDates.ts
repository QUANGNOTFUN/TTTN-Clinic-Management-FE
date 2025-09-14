export const stepWeekDates = (date: Date, step: string): Date => {
	const newDate = new Date(date);
	if (step === "next") {
		newDate.setUTCDate(date.getUTCDate() + 7);
	} else if (step === "prev") {
		newDate.setUTCDate(date.getUTCDate() - 7);
	}
	
	return newDate;
};