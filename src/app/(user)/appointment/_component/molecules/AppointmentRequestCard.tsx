import {format} from "date-fns"
import {Clock, Info, Phone} from "lucide-react"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import {useCancelAppointmentRequest} from "@/lib/hooks/appointment-request/useCancelAppointmentRequest";
import {toast} from "react-toastify";
import {Appointment} from "@/types/appointment-request";

interface AppointmentRequestCardProps {
    appointment: Appointment
}

export function AppointmentRequestCard(props: AppointmentRequestCardProps) {
    const { appointment } = props
    const targetTime = new Date(appointment.appointment_time).getTime()
    const [timeLeft, setTimeLeft] = useState(targetTime - Date.now())
    const totalDuration = 60 * 60;
    const { mutateAsync: cancel, isSuccess, data, error } = useCancelAppointmentRequest()
    
    const formatDateTime = (dateString: string) => {
        try {
            return format(new Date(dateString), "dd/MM/yyyy HH:mm")
        } catch {
            return dateString
        }
    }
    
    const statusMap: Record<string, { text: string; className: string }> = {
        PENDING: {
            text: "Đang chờ",
            className: "bg-amber-100 text-amber-800 ring-amber-200",
        },
        CONFIRMED: {
            text: "Đã xác nhận",
            className: "bg-green-100 text-green-800 ring-green-200",
        },
        CANCELLED: {
            text: "Đã hủy",
            className: "bg-red-100 text-red-800 ring-red-200",
        },
        COMPLETED: {
            text: "Hoàn thành",
            className: "bg-blue-100 text-blue-800 ring-blue-200",
        },
    }
    
    const handleCancel = async (id: string) => {
        await cancel(id);
    }
    const router = useRouter()

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message ?? "Hủy lịch hẹn thành công")
        }
        if (error) {
            toast.error(error?.message ?? "Có lỗi xảy ra")
        }
    }, [data?.message, error, isSuccess, router]);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(targetTime - Date.now())
        }, 1000)
        return () => clearInterval(interval)
    }, [targetTime])
    
    return (
        <Card className="rounded-xl shadow-sm border hover:shadow-md transition-all">
            {/* Header */}
            <CardHeader className="flex flex-col items-start gap-1.5">
                {/* FullName Patient */}
                <div className="flex items-start justify-between gap-2 w-full">
                    <CardTitle className="truncate text-2xl font-bold tracking-tight text-gray-900">
                        {appointment.full_name}
                    </CardTitle>
                    
                    {/* Hiện đồng hồ nếu còn pending */}
                    {appointment.status === "PENDING" ? (
                        <CountdownCircleTimer
                            isPlaying
                            duration={totalDuration}
                            initialRemainingTime={Math.floor(timeLeft / 1000)}
                            colors={["#10B981", "#F59E0B", "#EF4444"]}
                            colorsTime={[totalDuration, totalDuration / 2, 0]}
                            size={32}
                            strokeWidth={5}
                        >
                            {({remainingTime}) => {
                                const hrs = Math.floor(remainingTime / 3600)
                                const mins = Math.floor((remainingTime % 3600) / 60)
                                const secs = remainingTime % 60
                                return (
                                    <div className="text-center text-xs font-medium">
                                        {hrs > 0 ? `${hrs}:` : ""}
                                        {mins.toString().padStart(2, "0")}:
                                        {secs.toString().padStart(2, "0")}
                                    </div>
                                )
                            }}
                        </CountdownCircleTimer>
                        ) : (
                        // Nếu status SUCCESS hoặc CANCELED thì hiện badge
                        <span
                            className={`p-2 text-xs font-semibold rounded-md ${
                                appointment.status === "SUCCESS"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {appointment.status === "SUCCESS" ? "Thành công" : "Đã hủy"}
                        </span>
                    )}
            </div>
            
            {/*ID Appointment*/}
            <p className="text-xs uppercase text-gray-400 tracking-widest">
                ID: {appointment.id}
            </p>
        </CardHeader>
            
            {/* Content */}
            <CardContent className="flex flex-row items-start justify-between text-gray-700 gap-2">
                {/* Liên hệ */}
                <div>
                    <p className="text-xs uppercase font-medium text-gray-500 mb-1">
                        Số liên hệ
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-5 w-5 text-indigo-600" />
                        <span>{appointment.phone_number}</span>
                    </div>
                </div>
                
                {/* Divider */}
                <div className="w-px bg-gray-200 self-stretch" />
                
                {/* Thời gian */}
                <div>
                    <p className="text-xs uppercase font-medium text-gray-500 mb-1">
                        Thời gian lịch hẹn
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-5 w-5 text-indigo-600" />
                        <span>{formatDateTime(appointment.appointment_time)}</span>
                    </div>
                </div>
            </CardContent>
            <CardContent className="flex items-center justify-center gap-2">
                <Info className="h-5 w-5 text-red-400" />
                <p className="text-xs italic font-medium text-gray-500">
                    Lưu ý: chỉ có thể hủy lịch trước 30 phút đã hẹn.
                </p>
            </CardContent>
            
            {/* Footer (nút hành động) */}
            <CardFooter className="flex items-center justify-around  border-t border-gray-200">
                <p className=" text-xs text-gray-500 ">
                    Ngày đăng ký: {formatDateTime(appointment.created_at)}
                </p>
                {appointment.status === "PENDING" && (
                    <Button
                        size="default"
                        className={"text-sm font-medium text-white bg-red-400 hover:bg-red-600 cursor-pointer"}
                        onClick={() => handleCancel(appointment.id)}
                    >
                        Hủy lịch
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
