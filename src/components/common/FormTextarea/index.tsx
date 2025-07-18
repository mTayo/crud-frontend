/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { forwardRef } from 'react';



interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    labelClass?: string;
    icon?: React.ReactNode;
    inputName: string;
    inputClass?: string;
    showErrorMessage?: boolean;
    errorMessage?: string;
    inpuContainerClass?: string;
    placeholderIcon?: string;
    required?: boolean;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
    (
        {
            label = '',
            labelClass = 'label-class',
            icon = '',
            inputName,
            inputClass = '',
            showErrorMessage = true,
            errorMessage = '',
            inpuContainerClass = '',
            placeholderIcon = '',
            required = false,
            onChange,
            ...rest
        },
        ref
    ) => (
        <div className="form-input-group">
            <label htmlFor={inputName} className={`text-sm text-gray-400 ${labelClass}`}>
                {label} {required && <span className="text-[#D63928]">* </span>}
            </label>

            <div className={`relative  ${inpuContainerClass}`}>
                <textarea
                    className={`w-full bg-gray-900 text-sm border border-gray-700 text-white  p-2 rounded mt-1 focus:ring-0 ${inputClass}`}
                    name={inputName}
                    ref={ref}
                    onChange={onChange}
                    rows={5}
                    {...rest}
                />
                {icon && <div className="absolute right-2.5 bottom-4">{icon}</div>}
            </div>
            <div className="text-red-500 text-sm ">{errorMessage || ''}</div>
        </div>
    )
);
export default FormTextArea;