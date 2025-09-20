export const UPDATE_SERVICE_IMAGE_API_URL = (id: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}/images/service/${id}`

export const UPDATE_DOCTOR_IMAGE_API_URL = (id: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}/images/doctor/${id}`

export const UPDATE_PATIENT_IMAGE_API_URL = (id: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}/images/patient/${id}`

export const GET_IMAGE_API = (url_image?: string | null) => {
	if (!url_image || url_image === "N/A") {
		return "https://placehold.co/600x400"; // fallback ảnh mặc định
	}
	
	// đảm bảo base URL có "/" ở cuối
	const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
	return `${baseUrl}/${url_image.replace(/^\//, "")}`;
};

