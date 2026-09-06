import { LucideIcon } from "lucide-react";

export interface SidebarItem {
    label: String,
    href: String,
    icon: LucideIcon
}
export interface SidebarSction{
    title:String,
    items:SidebarItem[]
}