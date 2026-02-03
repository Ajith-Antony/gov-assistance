import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // In a real app, you might send this to an error reporting service
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center", marginTop: "50px" }}>
          <h1>Oops! Something went wrong</h1>
          <p>We're sorry for the inconvenience. Please try again.</p>
          {this.state.error && (
            <details style={{ marginTop: "20px", textAlign: "left", maxWidth: "600px", margin: "20px auto" }}>
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>Error Details</summary>
              <pre style={{ background: "#f5f5f5", padding: "10px", borderRadius: "4px", overflow: "auto" }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
          <button
            onClick={this.handleReset}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
