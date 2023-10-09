import React, { ErrorInfo, ReactNode, Suspense } from 'react';

interface ErrorBoundatyProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundatyProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundatyProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <Suspense fallback="">Ошибка</Suspense>;
        }

        return children;
    }
}

export default ErrorBoundary;
