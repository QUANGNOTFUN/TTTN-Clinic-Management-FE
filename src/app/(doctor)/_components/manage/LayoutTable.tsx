export interface LayoutTable{
    checkbox: boolean;
    label: string;
    key: string;
    type?: "text" | "number" | "date" | "boolean" | "icon";
    onClick?: () => void;
}
