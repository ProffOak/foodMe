const SnackbarStyle = {
  Success: 'snackbar-success' as 'snackbar-success',
  Error: 'snackbar-error' as 'snackbar-error',
};
type SnackbarStyle = (typeof SnackbarStyle)[keyof typeof SnackbarStyle];
export { SnackbarStyle };


const SnackbarMessage = {
  Success: 'Lyckad' as 'Lyckad',
  Error: 'Något gick fel' as 'Något gick fel',
  Custom: 'custom' as 'custom',
  Create: 'Lyckat skapande' as 'Lyckat skapande',
  Update: 'Lyckad updatering' as 'Lyckad updatering',
  Delete: 'Lyckad bortagning' as 'Lyckad bortagning',
  Login: 'Lyckad inloggning' as 'Lyckad inloggning',
  Register: 'Lyckad registrering' as 'Lyckad registrering',
  Logout: 'Lyckad utlogging' as 'Lyckad utlogging',
  EmailWrong: 'Emailen är ej registrerad' as 'Emailen är ej registrerad',
  PasswordWrong: 'Fel lösenord' as 'Fel lösenord',
  AddedToCart: 'Tillagd I kundvagnen' as 'Tillagd I kundvagnen'
};
type SnackbarMessage = (typeof SnackbarMessage)[keyof typeof SnackbarMessage];
export { SnackbarMessage };
