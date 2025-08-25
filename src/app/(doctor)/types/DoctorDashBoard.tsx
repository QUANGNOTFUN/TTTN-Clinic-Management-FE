import {ActionSetting} from "@/app/(doctor)/_components/action/Action";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {XIcon} from "lucide-react";
import {toast} from "react-toastify";

export interface DoctorTable<T> {
    label: string;
    key: string;
    type?: "text" | "number" | "date" | "boolean" |"checkbox";
    option?: string;
    required?: boolean;
    action?: ActionSetting<T>;
}

export interface DoctorFormProps<T> {
    initialData?: T;
    title: string;
    fields: { label: string; key: keyof T; type?: string; options?: string[]; required?: boolean;action?: ActionSetting<T>; }[];
    onClose?: () => void;
    onSubmit?: (data: T) => void;
    submitLabel: string;
}

export default function DoctorForm<T>({ initialData, title, fields, onClose, onSubmit, submitLabel }: DoctorFormProps<T>) {
    const [formData, setFormData] = useState<T>(initialData || ({} as T));
    const [displayValue, setDisplayValue] = useState<string>("");
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [formData]);

    const handleChange = (key: keyof T, value: string) => {
        const field = fields.find((f) => f.key === key);
        if (!field) { return; }

        const parsedValue = field?.type === "number" ? ( isNaN(parseInt(value, 10)) ? null : parseInt(value, 10) ) : ( value === "" ) ? null : value;
        setFormData((prev) => ({ ...prev, [key]: parsedValue }));
    };

    const validateFields = () => {
        const requiredFields = fields.filter((field) => field.required);
        const missingFields = requiredFields.filter((field) => formData[field.key] === "" || formData[field.key] === undefined);
        if (missingFields.length > 0) {
            toast.error(`Vui lòng nhập ${missingFields.map((field) => field.label).join(", ")}`, {toastId: "missing-fields"});
            return false;
        }
        return true;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!validateFields()) return;

        if (onSubmit) {
            const filteredData = fields.reduce((acc, field) => {
                acc[field.key] = formData[field.key];
                return acc;
            }, {} as T)
            onSubmit(filteredData);
        }
    };

    const textInput = (field: DoctorFormProps<T>['fields'][0]) => (
        <>
            <label className={"py-1 text-gray-700 dark:text-gray-200"}>{field.label}</label>
            <input
                type={field.type || 'text'}
                value={(formData[field.key] as unknown as string) || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className={"w-full px-4 py-2 outline outline-black/20 rounded-md bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"}
                placeholder={`Nhập ${field.label}`}
            />
        </>
    );

    const selectInput = (field: DoctorFormProps<T>['fields'][0]) => (
        <>
            <label className={"py-1 text-gray-700 dark:text-gray-200"}>{field.label}</label>
            <select
                value={(formData[field.key] as unknown as string) || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className={"w-full px-4 py-2 outline outline-black/20 rounded-md bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"}
            >
                <option value="">Hãy chọn {field.label}</option>
                {field.options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    )

    // const dateInput = (field: DoctorFormProps<T>['fields'][0]) => (
    // 	<>
    // 		<label className={"py-1 text-gray-700 dark:text-gray-200"}>{field.label}</label>
    // 		<input
    // 			type={"date"}
    // 			value={(formData[field.key] as unknown as string) || ""}
    // 			onChange={(e) => handleChange(field.key, e.target.value)}
    // 		/>
    // 	</>
    // )

    return (
        <div className={"fixed inset-0 bg-black/50 flex items-center justify-center z-40"}>
            <div
                ref={formRef}
                className={`relative w-full max-w-xs sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[24rem] transition-all duration-300 rounded-lg bg-white/90 dark:bg-gray-700 flex flex-col`}
            >
                <div className={"form-header bg-violet-400 dark:bg-gray-900 p-4 rounded-t-lg"}>
                    <h3 className={"text-center text-xl text-white dark:text-gray-200 font-bold"}>
                        {title}
                    </h3>

                    {/*{ button for closing the form }*/}
                    <button
                        type={"button"}
                        onClick={onClose}
                        className={"absolute top-2 right-2 outline outline-black/20 rounded-lg p-1 cursor-pointer " +
                            "bg-violet-300 dark:bg-gray-700 hover:bg-zinc-100  dark:border-gray-600 text-gray-100 hover:text-gray-600 dark:text-gray-200"}
                    >
                        <XIcon size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={"space-y-3 bg-white/90 dark:bg-gray-700 p-2 rounded-b-lg"}>
                    {fields.map((field) => (
                        <div key={String(field.key)} className={"flex flex-col bg-zinc-50 dark:bg-gray-800 hover:bg-zinc-100 hover:dark:bg-gray-500 outline outline-black/15 p-2 rounded-md shadow-lg"}>
                            {field.type === "select" ? selectInput(field) : textInput(field) }
                        </div>
                    ))}
                    { /* submit button and reset button */}
                    <div className={"flex justify-end space-x-2"}>
                        <button
                            type={"reset"}
                            onClick={() => setFormData(initialData || ({} as T))}
                            className={"w-full py-2 px-4 outline outline-black/20 rounded-xl shadow-lg font-bold bg-zinc-100 text-gray-600 hover:bg-violet-300 hover:text-gray-900 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-100"}
                        >
                            Xóa hết
                        </button>

                        <button
                            type={"submit"}
                            className={"w-full py-2 px-4 outline outline-black/20 rounded-xl shadow-lg font-bold bg-zinc-100 text-gray-600 hover:bg-violet-300 hover:text-gray-900 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-100"}
                        >
                            {submitLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
