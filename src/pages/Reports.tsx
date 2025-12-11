import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  FileText,
  Download,
  Calendar,
  Clock,
  FileDown,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface Report {
  id: string;
  name: string;
  dateRange: string;
  createdAt: string;
  size: string;
  alerts: number;
}

const mockReports: Report[] = [
  {
    id: "1",
    name: "Weekly Security Report",
    dateRange: "Jan 8 - Jan 15, 2024",
    createdAt: "2024-01-15 16:30:00",
    size: "2.4 MB",
    alerts: 1284,
  },
  {
    id: "2",
    name: "Monthly Summary",
    dateRange: "Dec 1 - Dec 31, 2023",
    createdAt: "2024-01-01 09:00:00",
    size: "8.7 MB",
    alerts: 5672,
  },
];

export default function Reports() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("");

  const handleGenerateReport = async () => {
    if (!reportType || !dateRange) {
      toast.error("Please select report type and date range");
      return;
    }

    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const newReport: Report = {
      id: Date.now().toString(),
      name: reportType === "weekly" ? "Weekly Security Report" : 
            reportType === "monthly" ? "Monthly Summary" : "Custom Report",
      dateRange: dateRange === "last7" ? "Last 7 days" :
                 dateRange === "last30" ? "Last 30 days" : "Custom range",
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
      size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      alerts: Math.floor(Math.random() * 2000) + 500,
    };

    setReports((prev) => [newReport, ...prev]);
    setIsGenerating(false);

    toast.success("Report generated", {
      description: "Your PDF report is ready for download",
    });
  };

  const handleDownload = (report: Report) => {
    toast.success("Download started", {
      description: `Downloading ${report.name}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Reports
        </h1>
        <p className="text-muted-foreground">
          Generate and download PDF security reports
        </p>
      </div>

      {/* Generate Report */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>
            Create a comprehensive PDF report of detection logs and statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-foreground">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                  <SelectItem value="monthly">Monthly Summary</SelectItem>
                  <SelectItem value="incident">Incident Report</SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-foreground">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Last 7 days</SelectItem>
                  <SelectItem value="last30">Last 30 days</SelectItem>
                  <SelectItem value="last90">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="w-full lg:w-auto"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileDown className="h-4 w-4 mr-2" />
                    Generate PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Generated Reports</h2>
        <div className="grid grid-cols-1 gap-4">
          {reports.map((report) => (
            <Card key={report.id} variant="glass" className="slide-up">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{report.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {report.dateRange}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {report.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        {report.size}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {report.alerts.toLocaleString()} alerts
                      </p>
                    </div>
                    <Button
                      variant="cyber"
                      onClick={() => handleDownload(report)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
