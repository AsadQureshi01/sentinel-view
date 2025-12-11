import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileSearch,
  Upload,
  FileUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

interface AnalysisResult {
  id: string;
  filename: string;
  size: string;
  packets: number;
  duration: string;
  alerts: number;
  status: "pending" | "analyzing" | "completed" | "error";
  threats: { type: string; count: number; severity: string }[];
}

export default function PcapAnalyzer() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([
    {
      id: "1",
      filename: "network_capture_2024-01-15.pcap",
      size: "45.2 MB",
      packets: 156789,
      duration: "2h 34m",
      alerts: 23,
      status: "completed",
      threats: [
        { type: "Port Scan", count: 12, severity: "high" },
        { type: "SQL Injection", count: 5, severity: "critical" },
        { type: "Suspicious DNS", count: 6, severity: "medium" },
      ],
    },
  ]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = async (files: File[]) => {
    const pcapFiles = files.filter(
      (f) => f.name.endsWith(".pcap") || f.name.endsWith(".pcapng")
    );

    if (pcapFiles.length === 0) {
      toast.error("Invalid file type", {
        description: "Please upload .pcap or .pcapng files",
      });
      return;
    }

    setIsAnalyzing(true);
    setUploadProgress(0);

    // Simulate upload and analysis
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 200));
      setUploadProgress(i);
    }

    const newResult: AnalysisResult = {
      id: Date.now().toString(),
      filename: pcapFiles[0].name,
      size: `${(pcapFiles[0].size / (1024 * 1024)).toFixed(1)} MB`,
      packets: Math.floor(Math.random() * 200000) + 50000,
      duration: "1h 23m",
      alerts: Math.floor(Math.random() * 30) + 5,
      status: "completed",
      threats: [
        { type: "Port Scan", count: Math.floor(Math.random() * 20), severity: "high" },
        { type: "Malware Signature", count: Math.floor(Math.random() * 5), severity: "critical" },
      ],
    };

    setResults((prev) => [newResult, ...prev]);
    setIsAnalyzing(false);
    setUploadProgress(0);

    toast.success("Analysis complete", {
      description: `Found ${newResult.alerts} potential threats`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <FileSearch className="h-6 w-6 text-primary" />
          PCAP Analyzer
        </h1>
        <p className="text-muted-foreground">
          Upload and analyze packet capture files for suspicious activity
        </p>
      </div>

      {/* Upload Zone */}
      <Card variant="glass">
        <CardContent className="p-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className={`h-16 w-16 rounded-full flex items-center justify-center transition-colors ${
                isDragging ? "bg-primary/20" : "bg-secondary"
              }`}>
                <Upload className={`h-8 w-8 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">
                  Drop your PCAP files here
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse • Supports .pcap and .pcapng
                </p>
              </div>
              <input
                type="file"
                accept=".pcap,.pcapng"
                multiple
                className="hidden"
                id="file-upload"
                onChange={(e) => handleFiles(Array.from(e.target.files || []))}
              />
              <label htmlFor="file-upload">
                <Button variant="cyber" className="cursor-pointer" asChild>
                  <span>
                    <FileUp className="h-4 w-4 mr-2" />
                    Select Files
                  </span>
                </Button>
              </label>
            </div>
          </div>

          {isAnalyzing && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Analyzing packets...</span>
                <span className="font-mono text-primary">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Analysis Results</h2>
        {results.map((result) => (
          <Card key={result.id} variant="glass" className="slide-up">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* File Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <FileSearch className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{result.filename}</p>
                        <p className="text-sm text-muted-foreground">
                          {result.size} • {result.packets.toLocaleString()} packets • {result.duration}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={result.status === "completed" ? "success" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      {result.status === "completed" ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {result.status}
                    </Badge>
                  </div>

                  {/* Threats Found */}
                  <div className="flex flex-wrap gap-2">
                    {result.threats.map((threat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary"
                      >
                        <AlertTriangle className={`h-4 w-4 ${
                          threat.severity === "critical" ? "text-destructive" :
                          threat.severity === "high" ? "text-warning" : "text-primary"
                        }`} />
                        <span className="text-sm font-medium">{threat.type}</span>
                        <Badge variant="outline" className="text-xs">
                          {threat.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
