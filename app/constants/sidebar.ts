import { SidebarItem, SidebarSction } from "@/types/layout.type";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  HardDrive,
  Globe,
  TriangleAlert,
  Bell,
} from "lucide-react";


export const sidebarItems: SidebarSction[] = [
   {
    title:"",
    items:[
        {
           
            label:"Dashboard",
            href:"/dashboard",
            icon:LayoutDashboard
        },
    ]
   },
   {
    title:"Monitoring",
    items:[
        {
            label:"API Baskets",
            href:"/baskets",
            icon:HardDrive
        },
        {
            label:"APIs",
            href:"/apis",
            icon:Globe
        },
        {
            label:"Incidents",
            href:"/incidents",
            icon:TriangleAlert
        },
        {
            label:"Analytics",
            href:"/analytics",
            icon:BarChart3
        },
        {
            label:"Notifications",
            href:"/notifications",
            icon:Bell
        },
        {
            label:"Settings",
            href:"/settings",
            icon:Settings
        }
    ]
   }
]