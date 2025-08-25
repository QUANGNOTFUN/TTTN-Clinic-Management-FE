"use client";

import { useState, useEffect } from "react";
import { CreateExaminationReportInput, MedicalExaminationInput } from "@/types/examination_report";
import { CreateTreatmentPlanInput } from "@/types/treatment_plan";
import { CreateRegimenInput } from "@/types/regimen";
import { useGetTreatmentPlan } from "@/libs/hooks/treatmentPlan/useGetTreatmentPlan";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";
import MedicationSelector from "@/app/(doctor)/patient/m_resource/MedicationSelector";
import {Medication} from "@/types/medications";
import {useQuery} from "@apollo/client";
import {GET_DOCTOR} from "@/libs/graphqls/doctors";

interface Props {
    onSubmitAction: (input: MedicalExaminationInput) => void;
    onCloseAction: () => void;
    patient_id: string;
    doctor_id: string;
}

export default function MedicalExaminationForm({ onSubmitAction, onCloseAction, patient_id, doctor_id }: Props) {
    const{data} = useQuery(GET_DOCTOR,{
        variables: { id: doctor_id },
        skip: !doctor_id,
    });

    const user = data?.doctor?.user;

    const [treatmentPlan, setTreatmentPlan] = useState<CreateTreatmentPlanInput>({
        name: "",
        hiv_diagnosis_date: undefined,
        start_date: undefined,
        end_date: undefined,
        notes: "",
    });

    const [regimen, setRegimen] = useState<CreateRegimenInput>({
        care_stage: "",
        regimen_type: "",
        medication_list: "",
        user_guide: "",
        is_default: false,
    });

    const [report, setReport] = useState<CreateExaminationReportInput>({
        name: "",
        doctor_id: doctor_id,
        risk_assessment: "",
        is_HIV: false,
        HIV_test_file: "",
        regimen_id: 0,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const { plan, loading } = useGetTreatmentPlan(patient_id);
    const [selectedMedications, setSelectedMedications] = useState<Medication[]>([]);


    // Sync existing plan data
    useEffect(() => {
        if (plan) {
            setTreatmentPlan({
                name: plan.name || "",
                hiv_diagnosis_date: plan.hiv_diagnosis_date ? new Date(plan.hiv_diagnosis_date) : undefined,
                start_date: plan.start_date ? new Date(plan.start_date) : undefined,
                end_date: plan.end_date ? new Date(plan.end_date) : undefined,
                notes: plan.notes || "",
            });

            setReport((prev) => ({
                ...prev,
                treatment_plan_id: plan.id?.toString() || "",
            }));
        }
    }, [plan]);

    const handleSubmit = () => {
        const newErrors: Record<string, string> = {};
        regimen.medication_list = selectedMedications.join(', ')

        // Validate treatmentPlan
        if (!treatmentPlan.name.trim()) newErrors.treatmentPlan_name = "Tên kế hoạch không được để trống";
        if (!treatmentPlan.start_date) newErrors.treatmentPlan_start = "Ngày bắt đầu không được để trống";
        if (!treatmentPlan.hiv_diagnosis_date) newErrors.treatmentPlan_hiv = "Ngày chẩn đoán HIV không được để trống";
        if (!treatmentPlan.end_date) newErrors.treatmentPlan_end = "Ngày kết thúc không được để trống";
        if (!treatmentPlan.notes.trim()) newErrors.treatmentPlan_notes = "Ghi chú không được để trống";

        // Validate regimen
        if (!regimen.care_stage.trim()) newErrors.regimen_care = "Giai đoạn ca bệnh không được để trống";
        if (!regimen.regimen_type.trim()) newErrors.regimen_type = "Phải chọn loại phác đồ";
        if (!regimen.medication_list.trim()) newErrors.regimen_medication = "Danh sách thuốc không được để trống";
        if (!regimen.user_guide.trim()) newErrors.regimen_guide = "Hướng dẫn sử dụng không được để trống";

        // Validate report
        if (!report.name.trim()) newErrors.report_name = "Tên phiếu khám không được để trống";
        if (!report.doctor_id.trim()) newErrors.report_doctor = "ID bác sĩ không được để trống";
        if (!report.risk_assessment.trim()) newErrors.report_risk = "Đánh giá rủi ro không được để trống";
        if (!report.HIV_test_file.trim()) newErrors.report_file = "File xét nghiệm HIV không được để trống";
        if (!report.regimen_id || report.regimen_id <= 0) newErrors.report_regimen = "Regimen ID không hợp lệ";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSubmitAction({ treatmentPlan, regimen, report });
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/40 backdrop-blur"
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-8 shadow-2xl border-2"
                >
                    {/* Close Button */}
                    <button
                        onClick={onCloseAction}
                        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Đóng form"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Phiếu Khám Lâm Sàng</h2>

                    {/* Existing Plan Notification */}
                    {plan && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center font-semibold"
                        >
                            Bệnh nhân đã có kế hoạch điều trị. Bạn có thể chỉnh sửa nếu cần.
                        </motion.div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center mb-6">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            <p className="ml-3 text-gray-600">Đang tải dữ liệu...</p>
                        </div>
                    )}

                    {/* Treatment Plan */}
                    <section className="mb-10">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                            🩺 Kế hoạch điều trị
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-medium mb-1 text-gray-700">Tên kế hoạch</label>
                                <input
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        errors.treatmentPlan_name ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Nhập tên kế hoạch"
                                    value={treatmentPlan.name}
                                    onChange={(e) => setTreatmentPlan({ ...treatmentPlan, name: e.target.value })}
                                />
                                {errors.treatmentPlan_name && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.treatmentPlan_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-700">Ngày bắt đầu</label>
                                <input
                                    type="date"
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        errors.treatmentPlan_start ? "border-red-500" : "border-gray-300"
                                    }`}
                                    value={treatmentPlan.start_date ? treatmentPlan.start_date.toISOString().split("T")[0] : ""}
                                    onChange={(e) =>
                                        setTreatmentPlan({ ...treatmentPlan, start_date: new Date(e.target.value) })
                                    }
                                />
                                {errors.treatmentPlan_start && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.treatmentPlan_start}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-700">Ngày chẩn đoán HIV</label>
                                <input
                                    type="date"
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        errors.treatmentPlan_hiv ? "border-red-500" : "border-gray-300"
                                    }`}
                                    value={
                                        treatmentPlan.hiv_diagnosis_date
                                            ? treatmentPlan.hiv_diagnosis_date.toISOString().split("T")[0]
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setTreatmentPlan({ ...treatmentPlan, hiv_diagnosis_date: new Date(e.target.value) })
                                    }
                                />
                                {errors.treatmentPlan_hiv && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.treatmentPlan_hiv}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-700">Ngày kết thúc</label>
                                <input
                                    type="date"
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        errors.treatmentPlan_end ? "border-red-500" : "border-gray-300"
                                    }`}
                                    value={treatmentPlan.end_date ? treatmentPlan.end_date.toISOString().split("T")[0] : ""}
                                    onChange={(e) =>
                                        setTreatmentPlan({ ...treatmentPlan, end_date: new Date(e.target.value) })
                                    }
                                />
                                {errors.treatmentPlan_end && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.treatmentPlan_end}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1 sm:col-span-2">
                                <label className="block font-medium mb-1 text-gray-700">Ghi chú</label>
                                <textarea
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        errors.treatmentPlan_notes ? "border-red-500" : "border-gray-300"
                                    }`}
                                    rows={4}
                                    placeholder="Nhập ghi chú"
                                    value={treatmentPlan.notes}
                                    onChange={(e) => setTreatmentPlan({ ...treatmentPlan, notes: e.target.value })}
                                />
                                {errors.treatmentPlan_notes && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.treatmentPlan_notes}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Regimen */}
                    <section className="mb-10">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                            💊 Phác đồ điều trị
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-medium mb-1 text-gray-700">Giai đoạn ca bệnh</label>
                                <input
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        errors.regimen_care ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Nhập giai đoạn ca bệnh"
                                    value={regimen.care_stage}
                                    onChange={(e) => setRegimen({ ...regimen, care_stage: e.target.value })}
                                />
                                {errors.regimen_care && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.regimen_care}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-700">Loại phác đồ</label>
                                <select
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        errors.regimen_type ? "border-red-500" : "border-gray-300"
                                    }`}
                                    value={regimen.regimen_type}
                                    onChange={(e) => setRegimen({ ...regimen, regimen_type: e.target.value })}
                                >
                                    <option value="">-- Chọn loại phác đồ --</option>
                                    <option value="ARV">ARV</option>
                                    <option value="PrEP">PrEP</option>
                                    <option value="PEP">PEP</option>
                                </select>
                                {errors.regimen_type && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.regimen_type}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-700">Danh sách thuốc</label>
                                <MedicationSelector
                                    selected={selectedMedications}
                                    onChange={setSelectedMedications}
                                    error={errors.regimen_medication}
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-700">Hướng dẫn sử dụng</label>
                                <input
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        errors.regimen_guide ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Nhập hướng dẫn sử dụng"
                                    value={regimen.user_guide}
                                    onChange={(e) => setRegimen({ ...regimen, user_guide: e.target.value })}
                                />
                                {errors.regimen_guide && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.regimen_guide}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1 sm:col-span-2 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_default"
                                    className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-blue-500"
                                    checked={regimen.is_default}
                                    onChange={(e) => setRegimen({ ...regimen, is_default: e.target.checked })}
                                />
                                <label htmlFor="is_default" className="text-gray-700">Phác đồ mặc định</label>
                            </div>
                        </div>
                    </section>

                    {/* Report */}
                    <section className="mb-10">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                            📝 Phiếu khám
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-medium mb-1 text-gray-700">Tên phiếu khám</label>
                                <input
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        errors.report_name ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Nhập tên phiếu khám"
                                    value={report.name}
                                    onChange={(e) => setReport({ ...report, name: e.target.value })}
                                />
                                {errors.report_name && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.report_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-700">Bác sĩ</label>
                                <input
                                    className="w-full px-4 py-2 border-2 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
                                    value={user?.full_name}
                                    readOnly
                                />

                                <input
                                    type="hidden"
                                    value={report.doctor_id}
                                    name="doctor_id"
                                />
                                {errors.report_doctor && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.report_doctor}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-700">Đánh giá rủi ro</label>
                                <input
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        errors.report_risk ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Nhập đánh giá rủi ro"
                                    value={report.risk_assessment}
                                    onChange={(e) => setReport({ ...report, risk_assessment: e.target.value })}
                                />
                                {errors.report_risk && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.report_risk}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-700">File xét nghiệm HIV</label>
                                <input
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        errors.report_file ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Nhập đường dẫn file xét nghiệm"
                                    value={report.HIV_test_file}
                                    onChange={(e) => setReport({ ...report, HIV_test_file: e.target.value })}
                                />
                                {errors.report_file && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.report_file}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-700">Regimen ID</label>
                                <input
                                    type="number"
                                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        errors.report_regimen ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Nhập Regimen ID"
                                    value={report.regimen_id || ""}
                                    onChange={(e) => setReport({ ...report, regimen_id: Number(e.target.value) })}
                                />
                                {errors.report_regimen && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.report_regimen}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1 sm:col-span-2 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_HIV"
                                    className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-blue-500"
                                    checked={report.is_HIV}
                                    onChange={(e) => setReport({ ...report, is_HIV: e.target.checked })}
                                />
                                <label htmlFor="is_HIV" className="text-gray-700">Dương tính HIV</label>
                            </div>
                        </div>
                    </section>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={onCloseAction}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Tạo
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}