import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ExternalLink } from "lucide-react";

interface Alert {
  id: string;
  timestamp: string;
  sourceIP: string;
  destIP: string;
  attackType: string;
  severity: "critical" | "high" | "medium" | "low";
  protocol: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    timestamp: "2024-01-15 14:32:01",
    sourceIP: "192.168.1.105",
    destIP: "10.0.0.50",
    attackType: "Port Scan",
    severity: "high",
    protocol: "TCP",
  },
  {
    id: "2",
    timestamp: "2024-01-15 14:31:45",
    sourceIP: "203.0.113.42",
    destIP: "10.0.0.12",
    attackType: "SQL Injection",
    severity: "critical",
    protocol: "HTTP",
  },
  {
    id: "3",
    timestamp: "2024-01-15 14:30:22",
    sourceIP: "198.51.100.23",
    destIP: "10.0.0.8",
    attackType: "DDoS Attempt",
    severity: "critical",
    protocol: "UDP",
  },
  {
    id: "4",
    timestamp: "2024-01-15 14:29:58",
    sourceIP: "192.168.1.200",
    destIP: "10.0.0.100",
    attackType: "Brute Force",
    severity: "medium",
    protocol: "SSH",
  },
  {
    id: "5",
    timestamp: "2024-01-15 14:28:33",
    sourceIP: "172.16.0.45",
    destIP: "10.0.0.5",
    attackType: "XSS Attempt",
    severity: "low",
    protocol: "HTTP",
  },
];

export function AlertsTable() {
  return (
    <Card variant="glass" className="slide-up">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <CardTitle>Recent Alerts</CardTitle>
        </div>
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          View All <ExternalLink className="h-3 w-3" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Source IP
                </th>
                <th className="pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Dest IP
                </th>
                <th className="pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Attack Type
                </th>
                <th className="pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Severity
                </th>
                <th className="pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Protocol
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {mockAlerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <td className="py-3 text-sm font-mono text-muted-foreground">
                    {alert.timestamp}
                  </td>
                  <td className="py-3 text-sm font-mono text-foreground">
                    {alert.sourceIP}
                  </td>
                  <td className="py-3 text-sm font-mono text-foreground">
                    {alert.destIP}
                  </td>
                  <td className="py-3 text-sm font-medium text-foreground">
                    {alert.attackType}
                  </td>
                  <td className="py-3">
                    <Badge variant={alert.severity}>{alert.severity}</Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant="outline">{alert.protocol}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
