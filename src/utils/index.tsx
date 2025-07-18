/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-cond-assign */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */



/**
 * Checks if an array is empty
 * @param {Array} arr Array to be tested
 * @returns {Boolean} Boolean value
 */
export const isArrayEmpty = (arr: []) => Array.isArray(arr) && arr.length === 0;

/**
 * Checks if an object has no set properties
 * @param {*} obj The object to test
 * @returns {*} boolean
 */
export const isObjectEmpty = (obj = {}) => !obj || Object.keys(obj).length === 0;

// /**
//  * Ensure that a given string matches the character count and ellipsized at that point
//  * @param {String} text Target text
//  * @param {Number} numChars Number of characters needed
//  * @returns {String} Truncated text
//  */
export const truncateMultilineText = (text: string, numChars: number) => {
    if (!text) return '';

    // Because '...' will be appended to long strings,
    // this ensures that the entire character count is as specified
    const maxStringLength = numChars - 3;

    return maxStringLength > text.length ? text : `${text.trim().substring(0, maxStringLength)}...`;
};

/**
 * Function that does nothing:
 * Useful as a default value for an optional Component prop
 * that's of type - function
 * Or for stubbing function calls in Tests and Storybook Docs
 * @returns {*} undefined
 */
export const noOp = () => {};

// /**
//  * Method to Extract initials from Full name
//  * @param {string} name name
//  * @returns {string} initials
//  */
export const getInitials = (name = ' ') => {
    const fullName = name.split(' ');
    const initials = fullName[0].substring(0, 1).toUpperCase();

    if (fullName.length > 1) {
        initials.concat(fullName[fullName.length - 1].substring(0, 1).toUpperCase());
    }

    return initials;
};

export const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

export const scrollDown = () => {
    window.scrollTo({
        // bottom:0,
        behavior: 'smooth'
    });
};
/**
 * Checks if an array is empty
 * @param {Array} arr Array to be tested
 * @returns {Boolean} Boolean value
 */
export const isNotEmptyArray = (arr: unknown) => Array.isArray(arr) && arr.length > 0;

export const changeNumberToArrayList = (number: number) => Array.from(Array(number).keys());

export const capitalizeFirstLetter = (string = '') => {
    if (typeof string === 'string') return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    return string;
};

export const extractFirstLetter = (string = '') => {
    if (string) {
        return string.charAt(0).toUpperCase();
    }

    return string;
};

export const generateRandomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const replaceSpace = (str = '_') =>
    // Empty
    str.split(' ').join('');

/**
 * Method to extract error message from error response object
 * @returns {*} The error messgae
 */
export const extractErrorMessage = (err: any) => {
    const errResponse = err.response || null;
    let errorMessage = '';
    if (!errResponse) return 'Something went Wrong. Please try again';
    if (errResponse.data && errResponse.data.message) {
        let msg = '';
        if (!isObjectEmpty(errResponse.data.message)) {
            for (const key in errResponse.data.message) {
                if (Object.hasOwnProperty.call(errResponse.data.message, key)) {
                    const element = errResponse.data.message[key];
                    if (isNotEmptyArray(element)) {
                        msg += `${[...element]}`;
                    } else {
                        msg += element;
                    }
                }
            }
            return msg;
        }
        errorMessage =
            errResponse === null
                ? 'Something went Wrong. Please try again'
                : errResponse && errResponse.data && errResponse.data.message
                ? errResponse.data.message
                : 'Something went Wrong. Please try again';
    }

    return errorMessage;
};

export const formatDate = (dateString: string, locale = 'en-US'): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatFilterDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};