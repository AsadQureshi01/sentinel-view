import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "00:00", alerts: 12, blocked: 8 },
  { time: "04:00", alerts: 8, blocked: 5 },
  { time: "08:00", alerts: 25, blocked: 18 },
  { time: "12:00", alerts: 45, blocked: 38 },
  { time: "16:00", alerts: 32, blocked: 25 },
  { time: "20:00", alerts: 28, blocked: 22 },
  { time: "Now", alerts: 38, blocked: 30 },
];

export function ThreatChart() {
  return (
    <Card variant="glass" className="slide-up">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle>Alert Trends (24h)</CardTitle>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            <span className="text-muted-foreground">Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success" />
            <span className="text-muted-foreground">Blocked</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 76%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142, 76%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 18%)" />
              <XAxis
                dataKey="time"
                stroke="hsl(215, 20%, 55%)"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="hsl(215, 20%, 55%)"
                fontSize={12}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 8%)",
                  border: "1px solid hsl(222, 47%, 18%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 98%)",
                }}
              />
              <Area
                type="monotone"
                dataKey="alerts"
                stroke="hsl(0, 84%, 60%)"
                strokeWidth={2}
                fill="url(#alertGradient)"
              />
              <Area
                type="monotone"
                dataKey="blocked"
                stroke="hsl(142, 76%, 45%)"
                strokeWidth={2}
                fill="url(#blockedGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
