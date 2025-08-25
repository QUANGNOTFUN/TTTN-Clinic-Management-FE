export const formatNumberWithCommas = (number: number | string): string => {
	if (number === "" || number === undefined || number === null) return "";
	return Number(number).toLocaleString("en-US", { minimumFractionDigits: 0 });
};

export const parseNumberFromCommas = (value: string): number | string => {
	if (!value) return "";
	const cleanValue = value.replace(/,/g, "");
	const parsed = parseInt(cleanValue, 10);
	return isNaN(parsed) ? "" : parsed;
};