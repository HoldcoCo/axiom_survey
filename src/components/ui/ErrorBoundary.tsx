import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { CARD, NAVY, PAGE, T1, T2 } from "@/theme/tokens";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render errors so the funnel never shows a blank white screen.
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            background: PAGE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <div
            style={{
              background: CARD,
              borderRadius: 20,
              padding: "32px 28px",
              maxWidth: 420,
              textAlign: "center",
              boxShadow: "0 8px 32px rgba(27,44,75,0.1)",
            }}
          >
            <h1 style={{ color: T1, fontSize: 20, marginBottom: 10 }}>
              Something went wrong
            </h1>
            <p style={{ color: T2, fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
              Please refresh the page to restart the Digital Health Check.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                background: NAVY,
                color: "white",
                border: "none",
                borderRadius: 12,
                padding: "12px 24px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
