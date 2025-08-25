import {HeaderDoctorTable} from "@/app/(doctor)/_components/Layout/DoctorTable";


export const INIT_BLOG_TABLE: HeaderDoctorTable[] = [
    {label:"ID", key: "id", type: 'number'},
    {label:"Title", key: 'title', type: 'text' },
    {label:"Description", key: 'content', type: 'text' },
    {label:"Loại", key: "category", type: 'text' },
    {label:"Ngày tạo bài viết", key: 'created_at', type: 'date' },
    {label:"Ngày update", key: 'updated_at', type: 'date' },
    {label:"Hành động", key: 'action', type: 'text' },
]