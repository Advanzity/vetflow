import React from 'react';
import * as Sentry from '@sentry/nextjs';
import { ErrorCode } from '@/lib/errors/types';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to Sentry
    Sentry.captureException(error, {
      extra: {
        componentStack: errorInfo.componentStack,
      },
    });
  }

  private getErrorMessage(error: Error): string {
    if ('code' in error && typeof error.code === 'string') {
      switch (error.code) {
        case ErrorCode.UNAUTHENTICATED:
          return 'Please log in to continue';
        case ErrorCode.UNAUTHORIZED:
          return 'You do not have permission to view this content';
        case ErrorCode.NOT_FOUND:
          return 'The requested resource was not found';
        default:
          return 'An unexpected error occurred';
      }
    }
    return 'An unexpected error occurred';
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              {this.state.error
                ? this.getErrorMessage(this.state.error)
                : 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
