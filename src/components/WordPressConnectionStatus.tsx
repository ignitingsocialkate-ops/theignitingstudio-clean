import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, AlertCircle, Wifi, WifiOff, Settings, RefreshCw } from 'lucide-react';
import { enhancedWordPressAPI } from '../services/enhanced-wordpress-api';
import { useEnhancedContent } from '../contexts/EnhancedContentContext';

interface ConnectionStatus {
  connected: boolean;
  responseTime: number | null;
  lastChecked: Date | null;
  error: string | null;
  wpVersion?: string;
  siteUrl?: string;
}

export function WordPressConnectionStatus() {
  const [status, setStatus] = useState<ConnectionStatus>({
    connected: false,
    responseTime: null,
    lastChecked: null,
    error: null
  });
  const [checking, setChecking] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const { refreshContent } = useEnhancedContent();

  const checkConnection = async () => {
    setChecking(true);
    const startTime = Date.now();
    
    try {
      // Test WordPress API connection
      const settings = await enhancedWordPressAPI.getSiteSettings();
      const responseTime = Date.now() - startTime;
      
      setStatus({
        connected: true,
        responseTime,
        lastChecked: new Date(),
        error: null,
        siteUrl: settings.url,
      });
    } catch (error: any) {
      setStatus({
        connected: false,
        responseTime: null,
        lastChecked: new Date(),
        error: error.message || 'Connection failed'
      });
    } finally {
      setChecking(false);
    }
  };

  const handleRefresh = async () => {
    await checkConnection();
    if (status.connected) {
      await refreshContent();
    }
  };

  useEffect(() => {
    // Check connection on component mount
    checkConnection();
    
    // Check periodically (every 5 minutes)
    const interval = setInterval(checkConnection, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Don't show in production unless there's an error or it's explicitly enabled
  const showInProduction = typeof process !== 'undefined' && 
    (process.env.NODE_ENV === 'development' || 
     process.env.REACT_APP_SHOW_WP_STATUS === 'true' ||
     !status.connected);

  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production' && !showInProduction) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <motion.div
        className={`bg-card/90 backdrop-blur-sm border rounded-lg shadow-lg transition-all duration-300 ${
          expanded ? 'w-80' : 'w-auto'
        }`}
        whileHover={{ scale: 1.02 }}
      >
        {/* Status Indicator */}
        <div
          className="flex items-center gap-3 p-3 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-2">
            {checking ? (
              <RefreshCw size={16} className="animate-spin text-primary" />
            ) : status.connected ? (
              <div className="flex items-center gap-2">
                <Wifi size={16} className="text-green-500" />
                <CheckCircle size={16} className="text-green-500" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <WifiOff size={16} className="text-red-500" />
                <AlertCircle size={16} className="text-red-500" />
              </div>
            )}
          </div>
          
          <span className="text-sm font-medium">
            WordPress {status.connected ? 'Connected' : 'Disconnected'}
          </span>
          
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            className="text-muted-foreground"
          >
            ▼
          </motion.div>
        </div>

        {/* Expanded Details */}
        <motion.div
          initial={false}
          animate={{ 
            height: expanded ? 'auto' : 0,
            opacity: expanded ? 1 : 0
          }}
          className="overflow-hidden"
        >
          <div className="px-3 pb-3 border-t border-border/50 pt-3">
            <div className="space-y-2 text-xs text-muted-foreground">
              {status.lastChecked && (
                <div>
                  <strong>Last checked:</strong> {status.lastChecked.toLocaleTimeString()}
                </div>
              )}
              
              {status.responseTime && (
                <div>
                  <strong>Response time:</strong> {status.responseTime}ms
                </div>
              )}
              
              {status.siteUrl && (
                <div>
                  <strong>WordPress URL:</strong> {status.siteUrl}
                </div>
              )}
              
              {status.error && (
                <div className="text-red-500">
                  <strong>Error:</strong> {status.error}
                </div>
              )}
              
              <div>
                <strong>Status:</strong> {status.connected ? 
                  'Using WordPress content' : 
                  'Using demo content'
                }
              </div>
            </div>
            
            <div className="flex gap-2 mt-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={checking}
                className="flex items-center gap-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/80 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={12} className={checking ? 'animate-spin' : ''} />
                Refresh
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setExpanded(false)}
                className="flex items-center gap-2 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-secondary/80 transition-colors"
              >
                <Settings size={12} />
                Hide
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}