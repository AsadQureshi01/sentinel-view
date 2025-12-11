import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Target } from "lucide-react";

const data = [
  { name: "Port Scan", count: 245 },
  { name: "SQL Injection", count: 189 },
  { name: "DDoS", count: 156 },
  { name: "Brute Force", count: 132 },
  { name: "XSS", count: 98 },
  { name: "Malware", count: 67 },
];

export function AttackTypesChart() {
  return (
    <Card variant="glass" className="slide-up">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-destructive" />
          <CardTitle>Top Attack Types</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(222, 47%, 18%)"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                stroke="hsl(215, 20%, 55%)"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="hsl(215, 20%, 55%)"
                fontSize={12}
                tickLine={false}
                width={90}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 8%)",
                  border: "1px solid hsl(222, 47%, 18%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 98%)",
                }}
                cursor={{ fill: "hsl(222, 47%, 12%)" }}
              />
              <Bar
                dataKey="count"
                fill="hsl(0, 84%, 60%)"
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
