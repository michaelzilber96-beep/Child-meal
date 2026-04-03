'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  label?: string;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-card p-8 max-w-md w-full text-center space-y-4">
          <div className="text-5xl">😔</div>
          {this.props.label && (
            <h2 className="text-xl font-bold text-gray-800">{this.props.label}</h2>
          )}
          <p className="text-gray-500 text-sm">Your profile is safe. Try refreshing.</p>
          <code className="block bg-gray-100 rounded-xl p-3 text-xs font-mono text-gray-700 break-all">
            {this.state.message}
          </code>
          <div className="flex flex-col gap-2">
            <button
              onClick={this.handleReset}
              className="w-full py-2 px-4 rounded-2xl bg-gray-100 text-gray-700 font-semibold text-sm"
            >
              Try again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2 px-4 rounded-2xl bg-gray-800 text-white font-semibold text-sm"
            >
              Reload page
            </button>
          </div>
        </div>
      </div>
    );
  }
}
