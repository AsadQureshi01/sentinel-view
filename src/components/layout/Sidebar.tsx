import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Radio,
  FileSearch,
  Shield,
  Settings,
  FileText,
  LogOut,
  Activity,
} from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/live-capture", label: "Live Capture", icon: Radio },
  { path: "/pcap-analyzer", label: "PCAP Analyzer", icon: FileSearch },
  { path: "/defense", label: "Defense System", icon: Shield },
  { path: "/reports", label: "Reports", icon: FileText },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <div className="relative">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">NetGuard</h1>
            <p className="text-xs text-muted-foreground">NIDS Control</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/30 shadow-lg shadow-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                {item.label}
                {item.path === "/live-capture" && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-success animate-pulse" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-sm font-medium text-foreground">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Admin</p>
              <p className="text-xs text-muted-foreground truncate">admin@netguard.io</p>
            </div>
            <NavLink
              to="/"
              className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
}
