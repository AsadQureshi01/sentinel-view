import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Radio,
  Play,
  Square,
  Activity,
  AlertTriangle,
  Wifi,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

interface LiveAlert {
  id: string;
  timestamp: string;
  sourceIP: string;
  destIP: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
}

const mockLiveAlerts: LiveAlert[] = [
  { id: "1", timestamp: "14:32:01.234", sourceIP: "192.168.1.105", destIP: "10.0.0.50", type: "Port Scan", severity: "high" },
  { id: "2", timestamp: "14:32:00.891", sourceIP: "203.0.113.42", destIP: "10.0.0.12", type: "SQL Injection", severity: "critical" },
  { id: "3", timestamp: "14:31:59.456", sourceIP: "198.51.100.23", destIP: "10.0.0.8", type: "DDoS Attempt", severity: "critical" },
  { id: "4", timestamp: "14:31:58.123", sourceIP: "192.168.1.200", destIP: "10.0.0.100", type: "Brute Force", severity: "medium" },
];

export default function LiveCapture() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedInterface, setSelectedInterface] = useState("");
  const [alerts, setAlerts] = useState<LiveAlert[]>(mockLiveAlerts);
  const [packetCount, setPacketCount] = useState(12847);

  const handleStartCapture = () => {
    if (!selectedInterface) {
      toast.error("Please select a network interface");
      return;
    }
    setIsCapturing(true);
    toast.success("Live capture started", {
      description: `Monitoring ${selectedInterface}`,
    });
  };

  const handleStopCapture = () => {
    setIsCapturing(false);
    toast.info("Live capture stopped");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Radio className="h-6 w-6 text-primary" />
            Live Capture
          </h1>
          <p className="text-muted-foreground">
            Monitor real-time network traffic and detect intrusions
          </p>
        </div>
      </div>

      {/* Control Panel */}
      <Card variant="glass">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Network Interface
              </label>
              <Select value={selectedInterface} onValueChange={setSelectedInterface}>
                <SelectTrigger className="w-full lg:w-64">
                  <SelectValue placeholder="Select interface" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eth0">eth0 - Ethernet</SelectItem>
                  <SelectItem value="wlan0">wlan0 - WiFi</SelectItem>
                  <SelectItem value="lo">lo - Loopback</SelectItem>
                  <SelectItem value="docker0">docker0 - Docker</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              {!isCapturing ? (
                <Button onClick={handleStartCapture} className="gap-2">
                  <Play className="h-4 w-4" />
                  Start Capture
                </Button>
              ) : (
                <Button variant="destructive" onClick={handleStopCapture} className="gap-2">
                  <Square className="h-4 w-4" />
                  Stop Capture
                </Button>
              )}
            </div>

            {/* Status Indicators */}
            <div className="flex items-center gap-6 ml-auto">
              <div className="flex items-center gap-2">
                <Wifi className={`h-5 w-5 ${isCapturing ? "text-success animate-pulse" : "text-muted-foreground"}`} />
                <span className="text-sm font-medium">
                  {isCapturing ? "Capturing" : "Idle"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <span className="text-sm font-mono">{packetCount.toLocaleString()} packets</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="cyber" className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">847</p>
              <p className="text-xs text-muted-foreground">Packets/sec</p>
            </div>
          </div>
        </Card>
        <Card variant="threat" className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">23</p>
              <p className="text-xs text-muted-foreground">Active Alerts</p>
            </div>
          </div>
        </Card>
        <Card variant="success" className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
              <Wifi className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">156</p>
              <p className="text-xs text-muted-foreground">Connections</p>
            </div>
          </div>
        </Card>
        <Card variant="warning" className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-warning/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">02:34:18</p>
              <p className="text-xs text-muted-foreground">Capture Duration</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Live Alerts Feed */}
      <Card variant="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${isCapturing ? "bg-success animate-pulse" : "bg-muted"}`} />
            Live Alert Feed
          </CardTitle>
          <Badge variant={isCapturing ? "success" : "secondary"}>
            {isCapturing ? "Streaming" : "Paused"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground w-24">
                    {alert.timestamp}
                  </span>
                  <span className="font-mono text-sm">{alert.sourceIP}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-mono text-sm">{alert.destIP}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{alert.type}</span>
                  <Badge variant={alert.severity}>{alert.severity}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
