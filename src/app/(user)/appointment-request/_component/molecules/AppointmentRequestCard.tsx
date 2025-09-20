import {format} from "date-fns"
import {Clock, Info, Phone} from "lucide-react"
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {useState} from "react"
import {CountdownCircleTimer} from "react-countdown-circle-timer"
import {AppointmentRequest} from "@/types/appointment-request";

interface AppointmentRequestCardProps {
    appointment: AppointmentRequest
    onCancel?: (id: string) => void
}

export function AppointmentRequestCard(props: AppointmentRequestCardProps) {
    const { appointment, onCancel } = props
    let targetTime = new Date(appointment.appointment_time).getTime()
    targetTime -= 30 * 60 * 1000 // 30 phút trước
    const [timeLeft] = useState(targetTime - Date.now())
    const totalDuration = 60 * 60
    
    const formatDateTime = (dateString: string) => {
        try {
            return format(new Date(dateString), "dd/MM/yyyy HH:mm")
        } catch {
            return dateString
        }
    }
    
    const statusMap: Record<
        string,
        { text: string; className: string }
    > = {
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
        REJECTED: {
            text: "Từ chối",
            className: "bg-orange-100 text-orange-800 ring-blue-200",
        },
    }
    
    const handleCancel = async (id: string) => {
        onCancel(id)
    }
    
    return (
        <Card className="rounded-xl shadow-sm border hover:shadow-md transition-all">
            {/* Header */}
            <CardHeader className="flex flex-col items-start gap-1.5">
                <div className="flex items-start justify-between gap-2 w-full">
                    <CardTitle className="truncate text-2xl font-bold tracking-tight text-gray-900">
                        {appointment.full_name}
                    </CardTitle>
                    
                    {/* Nếu pending thì hiển thị countdown */}
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
                            {({ remainingTime }) => {
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
                        // Badge theo statusMap
                        <span
                            className={`px-2 py-1 text-xs font-semibold rounded-md ${statusMap[appointment.status]?.className}`}
                        >
                          {statusMap[appointment.status]?.text ?? appointment.status}
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
            
            {/* Footer */}
            <CardFooter className="flex items-center justify-around border-t border-gray-200">
                <p className="text-xs text-gray-500 ">
                    Ngày đăng ký: {formatDateTime(appointment.created_at)}
                </p>
                {appointment.status === "PENDING" && (
                    <Button
                        size="default"
                        className={
                            "text-sm font-medium text-white bg-red-400 hover:bg-red-600 cursor-pointer"
                        }
                        onClick={() => handleCancel(appointment.id)}
                    >
                        Hủy lịch
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
