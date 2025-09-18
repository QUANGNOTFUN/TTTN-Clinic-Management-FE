import {useSession} from "next-auth/react";
import {CustomSession} from "@/types/login";
import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {DELETE_DOCTOR_API_URL} from "@/lib/api/doctor";
import {toast} from "react-toastify";

export function useDeleteDoctor() {
    const { data: session } = useSession() as { data: CustomSession | null };
    
    if (!session?.user.role.includes("MANAGER")) {
        toast.error("Bạn không có quyền xóa bác sĩ", { toastId: "delete-doctor-error" });
    }
    
    return useMutation({
        mutationKey: ["deleteDoctor"],
        mutationFn: async (id: string) => {
          const res = await axios.delete(DELETE_DOCTOR_API_URL(id),
              {
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
              }
          );
          return res?.data;
        },
        onSuccess: () => {
            toast.success("Xóa bác sĩ thành công", { toastId: "delete-doctor-success" });
        },
        onError: (error: AxiosError) => {
            toast.error(error?.message, { toastId: "delete-doctor-error" });
        },
    });
}