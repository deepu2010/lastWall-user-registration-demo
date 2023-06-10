export const validatePassword = (password: string): boolean => {
    // Minimum length of 8 characters
    if (password.length < 8) {
      return false;
    }
  
    // At least one number
    if (!/\d/.test(password)) {
      return false;
    }
  
    // At least one capital letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // At least one symbol
    if (!/[!@#$%^&*]/.test(password)) {
      return false;
    }
  
    // All conditions met
    return true;
  };
  