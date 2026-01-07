// API Configuration - Update this with your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Types
export interface Alert {
  id: string;
  timestamp: string;
  source_ip: string;
  dest_ip: string;
  attack_type: string;
  severity: "low" | "medium" | "high" | "critical";
  protocol: string;
  description?: string;
}

export interface BlockedIP {
  id: string;
  ip: string;
  reason: string;
  blocked_at: string;
  attack_count: number;
}

export interface DashboardStats {
  total_alerts: number;
  active_threats: number;
  blocked_ips: number;
  packets_analyzed: number;
  alerts_change?: string;
  threats_change?: string;
}

export interface PcapAnalysisResult {
  total_packets: number;
  alerts: Alert[];
  protocols: { name: string; value: number }[];
  summary: string;
}

export interface NetworkInterface {
  name: string;
  description: string;
}

// API Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    return this.request<DashboardStats>("/api/dashboard/stats");
  }

  async getRecentAlerts(limit = 10): Promise<Alert[]> {
    return this.request<Alert[]>(`/api/alerts?limit=${limit}`);
  }

  async getAlertTrends(): Promise<{ time: string; alerts: number; blocked: number }[]> {
    return this.request("/api/dashboard/trends");
  }

  async getProtocolDistribution(): Promise<{ name: string; value: number }[]> {
    return this.request("/api/dashboard/protocols");
  }

  async getAttackTypes(): Promise<{ name: string; count: number }[]> {
    return this.request("/api/dashboard/attack-types");
  }

  // Live Capture
  async getNetworkInterfaces(): Promise<NetworkInterface[]> {
    return this.request<NetworkInterface[]>("/api/capture/interfaces");
  }

  async startCapture(interfaceName: string): Promise<{ session_id: string }> {
    return this.request("/api/capture/start", {
      method: "POST",
      body: JSON.stringify({ interface: interfaceName }),
    });
  }

  async stopCapture(sessionId: string): Promise<void> {
    return this.request("/api/capture/stop", {
      method: "POST",
      body: JSON.stringify({ session_id: sessionId }),
    });
  }

  async getLiveAlerts(sessionId: string): Promise<Alert[]> {
    return this.request<Alert[]>(`/api/capture/alerts?session_id=${sessionId}`);
  }

  // PCAP Analysis
  async uploadPcap(file: File): Promise<PcapAnalysisResult> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${this.baseUrl}/api/pcap/analyze`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Defense System
  async getBlockedIPs(): Promise<BlockedIP[]> {
    return this.request<BlockedIP[]>("/api/defense/blocked");
  }

  async blockIP(ip: string, reason: string): Promise<void> {
    return this.request("/api/defense/block", {
      method: "POST",
      body: JSON.stringify({ ip, reason }),
    });
  }

  async unblockIP(ip: string): Promise<void> {
    return this.request("/api/defense/unblock", {
      method: "POST",
      body: JSON.stringify({ ip }),
    });
  }

  // Settings
  async getSettings(): Promise<Record<string, unknown>> {
    return this.request("/api/settings");
  }

  async updateSettings(settings: Record<string, unknown>): Promise<void> {
    return this.request("/api/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    });
  }

  async testEmailNotification(email: string): Promise<void> {
    return this.request("/api/settings/test-email", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async testTelegramNotification(chatId: string): Promise<void> {
    return this.request("/api/settings/test-telegram", {
      method: "POST",
      body: JSON.stringify({ chat_id: chatId }),
    });
  }

  // Reports
  async generateReport(
    startDate: string,
    endDate: string
  ): Promise<{ report_url: string }> {
    return this.request("/api/reports/generate", {
      method: "POST",
      body: JSON.stringify({ start_date: startDate, end_date: endDate }),
    });
  }

  async downloadReport(reportId: string): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/api/reports/${reportId}/download`);
    if (!response.ok) {
      throw new Error("Failed to download report");
    }
    return response.blob();
  }
}

export const api = new ApiClient(API_BASE_URL);
