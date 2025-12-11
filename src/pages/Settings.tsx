import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Settings as SettingsIcon,
  Mail,
  MessageCircle,
  Bell,
  Shield,
  Gauge,
  Save,
  TestTube,
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [telegramEnabled, setTelegramEnabled] = useState(true);
  const [emailAddress, setEmailAddress] = useState("admin@company.com");
  const [telegramChatId, setTelegramChatId] = useState("");
  const [telegramBotToken, setTelegramBotToken] = useState("");
  const [sensitivity, setSensitivity] = useState([75]);
  const [autoBlock, setAutoBlock] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [highAlerts, setHighAlerts] = useState(true);
  const [mediumAlerts, setMediumAlerts] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved", {
      description: "Your preferences have been updated",
    });
  };

  const handleTestEmail = () => {
    toast.info("Test email sent", {
      description: `Check ${emailAddress} for the test notification`,
    });
  };

  const handleTestTelegram = () => {
    if (!telegramChatId || !telegramBotToken) {
      toast.error("Configuration required", {
        description: "Please enter both Chat ID and Bot Token",
      });
      return;
    }
    toast.info("Test message sent", {
      description: "Check your Telegram for the test notification",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground">
            Configure alert notifications and system preferences
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Notifications */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle>Email Notifications</CardTitle>
              </div>
              <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
            </div>
            <CardDescription>
              Receive alert notifications via email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="admin@company.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                disabled={!emailEnabled}
              />
            </div>
            <Button
              variant="outline"
              onClick={handleTestEmail}
              disabled={!emailEnabled}
              className="w-full"
            >
              <TestTube className="h-4 w-4 mr-2" />
              Send Test Email
            </Button>
          </CardContent>
        </Card>

        {/* Telegram Notifications */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <CardTitle>Telegram Notifications</CardTitle>
              </div>
              <Switch checked={telegramEnabled} onCheckedChange={setTelegramEnabled} />
            </div>
            <CardDescription>
              Receive instant alerts via Telegram bot
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Bot Token
              </label>
              <Input
                type="password"
                placeholder="Enter your bot token"
                value={telegramBotToken}
                onChange={(e) => setTelegramBotToken(e.target.value)}
                disabled={!telegramEnabled}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Chat ID
              </label>
              <Input
                placeholder="Enter your chat ID"
                value={telegramChatId}
                onChange={(e) => setTelegramChatId(e.target.value)}
                disabled={!telegramEnabled}
              />
            </div>
            <Button
              variant="outline"
              onClick={handleTestTelegram}
              disabled={!telegramEnabled}
              className="w-full"
            >
              <TestTube className="h-4 w-4 mr-2" />
              Send Test Message
            </Button>
          </CardContent>
        </Card>

        {/* Alert Preferences */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Alert Preferences</CardTitle>
            </div>
            <CardDescription>
              Choose which severity levels trigger notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">Critical Alerts</p>
                <p className="text-xs text-muted-foreground">
                  Immediate action required
                </p>
              </div>
              <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">High Severity</p>
                <p className="text-xs text-muted-foreground">
                  Significant threat detected
                </p>
              </div>
              <Switch checked={highAlerts} onCheckedChange={setHighAlerts} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">Medium Severity</p>
                <p className="text-xs text-muted-foreground">
                  Potential security concern
                </p>
              </div>
              <Switch checked={mediumAlerts} onCheckedChange={setMediumAlerts} />
            </div>
          </CardContent>
        </Card>

        {/* Defense Settings */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Defense Settings</CardTitle>
            </div>
            <CardDescription>
              Configure automatic threat response
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">Auto-Block Threats</p>
                <p className="text-xs text-muted-foreground">
                  Automatically block detected attackers
                </p>
              </div>
              <Switch checked={autoBlock} onCheckedChange={setAutoBlock} />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    Detection Sensitivity
                  </span>
                </div>
                <span className="text-sm font-mono text-primary">{sensitivity[0]}%</span>
              </div>
              <Slider
                value={sensitivity}
                onValueChange={setSensitivity}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low (Less alerts)</span>
                <span>High (More alerts)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
