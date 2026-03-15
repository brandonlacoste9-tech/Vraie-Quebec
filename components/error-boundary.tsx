"use client"

import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <div className="text-center max-w-md">
              <h2 className="font-display font-light text-foreground text-2xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Une erreur est survenue
              </h2>
              <p className="text-muted-foreground mb-6">{this.state.error?.message || "Erreur inattendue"}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-luxury"
              >
                Recharger la page
              </button>
            </div>
          </div>
        )
      )
    }
    return this.props.children
  }
}
