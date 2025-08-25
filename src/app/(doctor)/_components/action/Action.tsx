import {JSX} from "react";

export interface Action {
    icon: JSX.Element;
    action: string; // ví dụ: "edit", "delete", "view"
    hide?: boolean;
    color?: string; // optional cho màu sắc nút/icon
}

export interface ActionSetting<T> {
    data: T;
    actions: Action[];
    onAction: (action: string, data: T) => void;
}
