export function getErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    if (error.message.includes('row-level security')) {
      return 'You are not signed in. Please sign out and sign in again.'
    }
    return error.message
  }

  return 'Something went wrong. Please try again.'
}