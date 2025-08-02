import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to analytics service
    if (typeof gtag !== "undefined") {
      gtag("event", "exception", {
        description: error.toString(),
        fatal: false,
      });
    }

    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary min-vh-100 d-flex align-items-center justify-content-center bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="text-center">
                  <div className="mb-4">
                    <i className="fas fa-exclamation-triangle text-warning display-1" />
                  </div>
                  <h1 className="display-4 fw-bold mb-3">
                    Oops! Something went wrong
                  </h1>
                  <p className="lead mb-4">
                    We're sorry, but something unexpected happened. Our team has
                    been notified and we're working to fix this issue.
                  </p>

                  {process.env.NODE_ENV === "development" && (
                    <div className="alert alert-danger text-start mb-4">
                      <h6 className="alert-heading">
                        Error Details (Development Mode):
                      </h6>
                      <pre className="mb-0" style={{ fontSize: "0.8rem" }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}

                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={() => window.location.reload()}
                    >
                      <i className="fas fa-redo me-2" />
                      Reload Page
                    </button>
                    <a href="/" className="btn btn-outline-primary btn-lg">
                      <i className="fas fa-home me-2" />
                      Go Home
                    </a>
                  </div>

                  <div className="mt-5">
                    <p className="text-muted">
                      If this problem persists, please{" "}
                      <a href="#contact" className="text-decoration-none">
                        contact our support team
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
