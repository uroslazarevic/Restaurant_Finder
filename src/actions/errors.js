export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export const UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE';

// Update the currently visible error message.
export const updateErrorMessage = payload => ({
  type: UPDATE_ERROR_MESSAGE,
  error: true,
  payload,
});

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
});
