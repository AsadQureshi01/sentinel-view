import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Shield,
  Search,
  Unlock,
  Ban,
  Globe,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

interface BlockedIP {
  id: string;
  ip: string;
  country: string;
  reason: string;
  blockedAt: string;
  attackCount: number;
  autoBlocked: boolean;
}

const mockBlockedIPs: BlockedIP[] = [
  {
    id: "1",
    ip: "203.0.113.42",
    country: "Russia",
    reason: "SQL Injection Attempts",
    blockedAt: "2024-01-15 14:32:01",
    attackCount: 156,
    autoBlocked: true,
  },
  {
    id: "2",
    ip: "198.51.100.23",
    country: "China",
    reason: "DDoS Attack",
    blockedAt: "2024-01-15 12:15:33",
    attackCount: 2847,
    autoBlocked: true,
  },
  {
    id: "3",
    ip: "192.0.2.88",
    country: "North Korea",
    reason: "Brute Force SSH",
    blockedAt: "2024-01-14 23:45:12",
    attackCount: 892,
    autoBlocked: true,
  },
  {
    id: "4",
    ip: "185.220.101.1",
    country: "Germany",
    reason: "Port Scanning",
    blockedAt: "2024-01-14 18:22:45",
    attackCount: 45,
    autoBlocked: false,
  },
];

export default function Defense() {
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>(mockBlockedIPs);
  const [searchQuery, setSearchQuery] = useState("");
  const [manualIP, setManualIP] = useState("");

  const handleUnblock = (id: string) => {
    const ip = blockedIPs.find((b) => b.id === id);
    setBlockedIPs((prev) => prev.filter((b) => b.id !== id));
    toast.success("IP Unblocked", {
      description: `${ip?.ip} has been removed from the blocklist`,
    });
  };

  const handleManualBlock = () => {
    if (!manualIP) return;

    // Basic IP validation
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(manualIP)) {
      toast.error("Invalid IP Address", {
        description: "Please enter a valid IPv4 address",
      });
      return;
    }

    const newBlock: BlockedIP = {
      id: Date.now().toString(),
      ip: manualIP,
      country: "Unknown",
      reason: "Manually Blocked",
      blockedAt: new Date().toISOString().replace("T", " ").slice(0, 19),
      attackCount: 0,
      autoBlocked: false,
    };

    setBlockedIPs((prev) => [newBlock, ...prev]);
    setManualIP("");
    toast.success("IP Blocked", {
      description: `${manualIP} has been added to the blocklist`,
    });
  };

  const filteredIPs = blockedIPs.filter(
    (ip) =>
      ip.ip.includes(searchQuery) ||
      ip.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ip.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Defense System
        </h1>
        <p className="text-muted-foreground">
          Manage blocked IPs and firewall rules
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="threat" className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-destructive/20 flex items-center justify-center">
              <Ban className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-3xl font-bold font-mono">{blockedIPs.length}</p>
              <p className="text-sm text-muted-foreground">Blocked IPs</p>
            </div>
          </div>
        </Card>
        <Card variant="warning" className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-warning/20 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-3xl font-bold font-mono">
                {blockedIPs.reduce((sum, ip) => sum + ip.attackCount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Attacks Blocked</p>
            </div>
          </div>
        </Card>
        <Card variant="success" className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-success/20 flex items-center justify-center">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-3xl font-bold font-mono">Active</p>
              <p className="text-sm text-muted-foreground">Firewall Status</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Manual Block */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Manual IP Block</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter IP address (e.g., 192.168.1.1)"
              value={manualIP}
              onChange={(e) => setManualIP(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleManualBlock}>
              <Ban className="h-4 w-4 mr-2" />
              Block IP
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Blocked IPs List */}
      <Card variant="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Blocked IP Addresses</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search IPs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Country
                  </th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Blocked At
                  </th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Attacks
                  </th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Type
                  </th>
                  <th className="pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredIPs.map((blocked) => (
                  <tr
                    key={blocked.id}
                    className="hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-4">
                      <span className="font-mono text-sm font-medium text-foreground">
                        {blocked.ip}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{blocked.country}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-foreground">{blocked.reason}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="font-mono">{blocked.blockedAt}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="font-mono text-sm text-destructive font-medium">
                        {blocked.attackCount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4">
                      <Badge variant={blocked.autoBlocked ? "destructive" : "secondary"}>
                        {blocked.autoBlocked ? "Auto" : "Manual"}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnblock(blocked.id)}
                        className="gap-1"
                      >
                        <Unlock className="h-3 w-3" />
                        Unblock
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
