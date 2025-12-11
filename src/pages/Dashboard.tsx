import { useState } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertsTable } from "@/components/dashboard/AlertsTable";
import { ThreatChart } from "@/components/dashboard/ThreatChart";
import { ProtocolChart } from "@/components/dashboard/ProtocolChart";
import { AttackTypesChart } from "@/components/dashboard/AttackTypesChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Shield,
  Network,
  Activity,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Security Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time network intrusion monitoring and analysis
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
              className="pl-9 w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button
            variant="cyber"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/30">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
          <span className="font-medium text-success">System Active</span>
          <Badge variant="success" className="ml-2">Protected</Badge>
        </div>
        <span className="text-sm text-muted-foreground font-mono">
          Last scan: 2 minutes ago
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Alerts (24h)"
          value="1,284"
          change="+12% from yesterday"
          changeType="negative"
          icon={AlertTriangle}
          variant="threat"
        />
        <StatCard
          title="Blocked Threats"
          value="892"
          change="+8% from yesterday"
          changeType="positive"
          icon={Shield}
          variant="success"
        />
        <StatCard
          title="Unique Source IPs"
          value="156"
          change="+5 new today"
          changeType="neutral"
          icon={Network}
          variant="default"
        />
        <StatCard
          title="Active Connections"
          value="2,847"
          change="Within normal range"
          changeType="neutral"
          icon={Activity}
          variant="warning"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThreatChart />
        <div className="grid grid-cols-1 gap-6">
          <ProtocolChart />
        </div>
      </div>

      {/* Attack Types and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AttackTypesChart />
        <div className="lg:col-span-2">
          <AlertsTable />
        </div>
      </div>
    </div>
  );
}
