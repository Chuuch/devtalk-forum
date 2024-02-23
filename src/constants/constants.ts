// const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;

// TODO: To be changed with the above one after testing
export const passwordPattern = /^[0-9]{6,32}$/;
export const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const namePattern = /^[A-Za-z]{3,32}$/;
export const usernamePattern = /^[A-Za-z0-9]{3,32}$/;
