import { useReducer } from "react";

export function UserNameValid(userName) {
    // Define the regular expression to match any character from the alphabet
    var alphabetRegex = /[a-zA-Z]/;
    // Use the test() method to check if the inputString contains at least one alphabet character
    if (userName.trim() === "" || !alphabetRegex.test(userName)) {
        return "Username must contain at least one character from [a-zA-Z]";
    }
    return "";


}

export function PasswordValid(password) {
    // Define regular expressions for each requirement
    // At least 8 characters
    var lengthRegex = /.{8,}/;
    // At least one digit
    var digitRegex = /\d/;
    // At least one uppercase letter
    var uppercaseRegex = /[A-Z]/;
    // At least one lowercase letter
    var lowercaseRegex = /[a-z]/;
    // At least one special character
    var specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;

    var isLengthValid = lengthRegex.test(password);
    var isDigitValid = digitRegex.test(password);
    var isUppercaseValid = uppercaseRegex.test(password);
    var isLowercaseValid = lowercaseRegex.test(password);
    var isSpecialCharValid = specialCharRegex.test(password);

    // Check if all requirements are met
    if (!isLengthValid) {
        return "password must contain at least 8 characters "
    }

    if (!isDigitValid) {
        return "password must contain at least one digit"
    }

    if (!isUppercaseValid) {
        return "password must contain at least one uppercase letter"
    }

    if (!isLowercaseValid) {
        return "password must contain at least one lowercase letter"
    }

    if (!isSpecialCharValid) {
        return "password must contain at least one special character"
    }

    // Return true if all requirements are met
    return "";

}

