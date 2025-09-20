import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSectionHome() {
	return (
		<section className="min-h-screen py-12 md:py-20 bg-gradient-to-bl from-teal-200 via-emerald-100 to-sky-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 px-4 sm:px-6 lg:px-8">
				
				{/* Card thông tin liên hệ */}
				<div className="bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-6 sm:mb-8">
						Thông Tin Liên Hệ
					</h2>
					<div className="space-y-5 sm:space-y-6 text-gray-700 dark:text-gray-300 text-base sm:text-lg">
						<p className="flex items-center gap-3">
							<span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg">
								<Phone size={20} />
							</span>
							<span>
								<span className="font-semibold">Hotline:</span> 1900 123 456
							</span>
						</p>
						<p className="flex items-center gap-3">
							<span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg">
								<Mail size={20} />
							</span>
							<span>
								<span className="font-semibold">Email:</span> contact@yte.vn
							</span>
						</p>
						<p className="flex items-center gap-3">
							<span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
								<MapPin size={20} />
							</span>
							<span>
								<span className="font-semibold">Địa chỉ:</span> 123 Đường Sức
								Khỏe, TP. Hồ Chí Minh
							</span>
						</p>
					</div>
				</div>
				
				{/* Google Map */}
				<div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.014343986135!2d107.83805711013663!3d11.550828544386283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173f79dffe37b83%3A0xa46fe528df77f53a!2zTmfDoyAzIFTDoCBOZ8OgbywgTOG7mWMgVGhhbmgsIELhuqNvIEzhu5ljLCBMw6JtIMSQ4buTbmcgMDI2MzMsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1749112486281!5m2!1svi!2s"
						className="w-full h-64 sm:h-80 md:h-96 lg:h-full rounded-2xl"
						style={{ border: 0 }}
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						title="Địa chỉ Google Map"
					></iframe>
				</div>
			</div>
		</section>
	);
}
