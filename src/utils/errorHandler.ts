
export interface ErrorHandlerOptions {
  defaultMessage: string;
  showLoading?: boolean;
}

export const createErrorHandler = (setState: (updates: Record<string, unknown>) => void) => {
  return (error: unknown, options: ErrorHandlerOptions) => {
    const errorMessage = error instanceof Error ? error.message : options.defaultMessage;
    
    setState({
      loading: options.showLoading ?? false,
      error: errorMessage,
    });
  };
};

export const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof Error && (
    error.message.includes('fetch') ||
    error.message.includes('network') ||
    error.message.includes('connection')
  );
};

export const isApiError = (error: unknown): boolean => {
  return error instanceof Error && (
    error.message.includes('API') ||
    error.message.includes('weather')
  );
};
