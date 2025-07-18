/* eslint-disable @typescript-eslint/no-unused-vars */

import  { forwardRef } from 'react';



interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelClass?: string;
    icon?: React.ReactNode;
    inputName: string;
    inputType: string;
    inputClass?: string;
    showErrorMessage?: boolean;
    errorMessage?: string;
    inpuContainerClass?: string;
    placeholderIcon?: string;
    required?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            label = '',
            labelClass = 'label-class',
            icon = '',
            inputName,
            inputType,
            inputClass = '',
            showErrorMessage = true,
            errorMessage = '',
            inpuContainerClass = '',
            placeholderIcon = '',
            required = false,
            onChange,
            ...rest
        }
    ) => (
        <div className="form-input-group">
            <label htmlFor={inputName} className={`text-sm text-gray-400 ${labelClass}`}>
                {label} {required && <span className="text-[#D63928]">* </span>}
            </label>

            <div className={`relative  ${inpuContainerClass}`}>
                <input
                    className={`w-full bg-gray-900 border border-gray-700 text-white text-sm p-2 rounded mt-1 focus:ring-0 ${inputClass}`}
                    name={inputName}
                    type={inputType}
                    onChange={onChange}
                    {...rest}
                />
                {icon && <div className="absolute right-2.5 bottom-4">{icon}</div>}
            </div>
            <div className="text-red-500 text-sm ">{errorMessage || ''}</div>
        </div>
    )
);

export default FormInput;