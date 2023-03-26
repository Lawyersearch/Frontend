export const isValidEmail = (email?: string): boolean => {
    const mailRegex = /^[a-zA-Z0-9]{2,}@[a-z]{2,}\.[a-z]{2,}$/g;
    return email ? mailRegex.test(email) : false;
};

export const isValidPassword = (password: string): boolean => {
    return password.length > 7 && !password.includes("123") && !password.includes("qwe");
};

export const isNotEmpty = (str?: string) => !!str;

export const isNumberLike = (str?: string) => str && /^[1-9][0-9]*$/.test(str);
