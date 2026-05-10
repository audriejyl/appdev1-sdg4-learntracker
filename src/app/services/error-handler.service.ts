import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Error representation
 */
export interface AppError {
  id: string;
  code: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  timestamp: Date;
  dismissible: boolean;
}

/**
 * Service for centralized error handling and notification
 */
@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  private errors$ = new BehaviorSubject<AppError[]>([]);
  public errors: Observable<AppError[]> = this.errors$.asObservable();

  /**
   * Logs an error
   * @param code - Error code
   * @param message - Error message
   * @param severity - Error severity level
   * @param dismissible - Whether error can be dismissed
   */
  logError(
    code: string,
    message: string,
    severity: 'info' | 'warning' | 'error' | 'critical' = 'error',
    dismissible: boolean = true
  ): void {
    const error: AppError = {
      id: this.generateErrorId(),
      code,
      message,
      severity,
      timestamp: new Date(),
      dismissible,
    };

    const currentErrors = this.errors$.getValue();
    this.errors$.next([...currentErrors, error]);

    // Auto-dismiss info and warning messages after 5 seconds
    if (severity === 'info' || severity === 'warning') {
      setTimeout(() => this.dismissError(error.id), 5000);
    }
  }

  /**
   * Dismisses an error by ID
   * @param errorId - ID of error to dismiss
   */
  dismissError(errorId: string): void {
    const currentErrors = this.errors$.getValue();
    this.errors$.next(currentErrors.filter((e: AppError) => e.id !== errorId));
  }

  /**
   * Clears all errors
   */
  clearAllErrors(): void {
    this.errors$.next([]);
  }

  /**
   * Gets the most recent error
   * @returns Latest error or undefined
   */
  getLatestError(): AppError | undefined {
    const errors = this.errors$.getValue();
    return errors.length > 0 ? errors[errors.length - 1] : undefined;
  }

  /**
   * Generates a unique error ID
   * @returns Unique error ID
   */
  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
}
