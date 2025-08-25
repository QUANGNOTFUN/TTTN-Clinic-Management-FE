import React from 'react';

interface PatientFormProps {
    form: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ form, onChange }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Các input như fullName, gender, dob, phone, province, district, ward */}
            {[
                { label: 'Họ và tên', name: 'fullName', required: true },
                { label: 'Giới tính', name: 'gender', type: 'select', options: ['MALE', 'FEMALE', 'OTHER'], required: true },
                { label: 'Ngày sinh', name: 'dob', type: 'date', required: true },
                { label: 'Số điện thoại', name: 'phone', required: true },
                { label: 'Tỉnh/Thành phố', name: 'province' },
                { label: 'Quận/Huyện', name: 'district' },
                { label: 'Phường/Xã', name: 'ward' },
            ].map((field) =>
                field.type === 'select' ? (
                    <div key={field.name}>
                        <label className="block font-semibold mb-1">{field.label}</label>
                        <select
                            name={field.name}
                            value={form[field.name]}
                            onChange={onChange}
                            required={field.required}
                            className="w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Chọn giới tính</option>
                            {field.options?.map((opt) => (
                                <option key={opt} value={opt}>{opt === 'MALE' ? 'Nam' : opt === 'FEMALE' ? 'Nữ' : 'Khác'}</option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div key={field.name}>
                        <label className="block font-semibold mb-1">{field.label}</label>
                        <input
                            type={field.type || 'text'}
                            name={field.name}
                            value={form[field.name]}
                            onChange={onChange}
                            required={field.required}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                )
            )}
            <div className="md:col-span-2">
                <label className="block font-semibold mb-1" htmlFor="symptoms">Mô tả triệu chứng</label>
                <textarea
                    name="symptoms"
                    value={form.symptoms}
                    onChange={onChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Mô tả triệu chứng..."
                />
            </div>
        </div>
    );
};

export default PatientForm;
