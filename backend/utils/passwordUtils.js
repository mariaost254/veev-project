const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasSpecialChar) {
        throw new Error('Password must contain at least one uppercase letter and one special character');
    }
};

module.exports = {
    validatePassword
};