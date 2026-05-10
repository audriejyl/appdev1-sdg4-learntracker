import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Logging service for application-wide event tracking
 */
@Injectable({ providedIn: 'root' })
export class LoggerService {
  private logs$ = new BehaviorSubject<AppLog[]>([]);
  public logs: Observable<AppLog[]> = this.logs$.asObservable();

  /**
   * Log levels
   */
  enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
  }

  /**
   * Logs a message
   * @param level - Log level
   * @param message - Log message
   * @param data - Optional contextual data
   */
  log(level: string, message: string, data?: unknown): void {
    const log: AppLog = {
      timestamp: new Date(),
      level,
      message,
      data,
    };

    const currentLogs = this.logs$.getValue();
    this.logs$.next([...currentLogs, log]);

    // Also log to console in development
    console[level as keyof typeof console](`[${level.toUpperCase()}] ${message}`, data);
  }

  /**
   * Convenience method for debug logs
   */
  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  /**
   * Convenience method for info logs
   */
  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  /**
   * Convenience method for warning logs
   */
  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  /**
   * Convenience method for error logs
   */
  error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }

  /**
   * Clears all logs
   */
  clearLogs(): void {
    this.logs$.next([]);
  }
}

/**
 * Application log entry
 */
export interface AppLog {
  timestamp: Date;
  level: string;
  message: string;
  data?: unknown;
}
