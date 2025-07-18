/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateAll, extend } from 'indicative/validator';
import { getValue } from 'indicative-utils';
import validator from 'validator';
import type { ValidationDataRoot } from 'indicative-utils/build/src/contracts';

extend('isEmail', {
    async: true,
    /**
     * @param {*} args
     * @returns {args} args
     */
    compile(args: Array<unknown>) {
        return args;
    },

    /**
     * @param {*} data data object
     * @param {*} field fields
     * @returns {Boolean} bool
     */
    async validate(data: ValidationDataRoot, field: string) {
        const fieldValue = getValue(data, field);
        return validator.isEmail(fieldValue);
    }
});



/**
 * Method to validate form data
 * @param {*} data
 * @param {*} rules
 * @param {*} messages
 * @returns {object} error
 */


export const validateData = async (
    data: Record<string, unknown>,
    rules: any,
    messages: Record<string, string>
) =>
    validateAll(data, rules, messages)
        .then(() => ({}))
        .catch((errors: Array<{ field: string; message: string }>) => {
            const formattedErrors: Record<string, string> = {};

            errors.forEach((error) => (formattedErrors[error.field] = error.message));

            return formattedErrors;
        });
