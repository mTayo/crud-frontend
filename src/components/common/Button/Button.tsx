/* eslint-disable @typescript-eslint/no-explicit-any */

import  { type JSX } from 'react';
import './button.scss';
import MoonLoader from "react-spinners/MoonLoader"
import AnimateElement from '../AnimateElement';

interface ButtonPropsType {
    text?: string;
    type?: string;
    action: any;
    className?: string;
    icon?: any;
    isLoading?: boolean;
    disabled?: boolean;
    animateClass?: string;
}

const Button = (props: ButtonPropsType): JSX.Element => {
    const { text, action, className, icon, isLoading, disabled, animateClass, ...rest } = props;

    const btnLoadingComponent = () => (
        <div className="flex justify-center w-full items-center">
            
            <MoonLoader
                size={20}
                color="black"
            />
        </div>
    );
    return (
        <AnimateElement className={animateClass}>
            {!icon ? (
                <button
                    onClick={action}
                    className={` ${className} cursor-pointer ${disabled ? 'button-disabled' : ''} ${isLoading ? 'not-allowed' : ''}`}
                    disabled={disabled}
                    {...rest}
                    type="button"
                >
                    {isLoading ? <div>{btnLoadingComponent()}</div> : <div className="text-center w-full">{text}</div>}
                </button>
            ) : (
                <button
                    
                    onClick={action}
                    className={`app-icon-button cursor-pointer ${className} ${disabled ? 'button-disabled' : ''} ${isLoading ? 'not-allowed' : ''}`}
                    disabled={disabled}
                    {...rest}
                    type="button"
                >
                    {isLoading ? (
                        <span>{btnLoadingComponent()}</span>
                    ) : (
                        <>
                            <span>{icon}</span>
                            {text && <span>{text}</span>}
                        </>
                    )}
                </button>
            )}
        </AnimateElement>
    );
};
export default Button;
