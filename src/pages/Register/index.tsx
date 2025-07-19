import { useAppDispatch } from "appconfig/redux-store/hooks";
import { setActiveUser } from "appconfig/redux-store/slices/global";
import FormInput from "components/common/FormInput";
import { validateData } from "helpers/validator";
import type { IUser } from "models/app-interface";
import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthServiceApi } from "services/auth.service";
import { extractErrorMessage, isObjectEmpty } from "utils";
import Cookies from 'js-cookie';
import { errorToast, successToast } from "components/common/Toast";
import Button from "components/common/Button";

type InitialState = {
    formData: {
        email: string;
        password: string;
    };
    showPassword: boolean;
    errors: Record<string, string>;
    isLoading: boolean;
    initialized: boolean;
    token: string;
};

const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const initialState: InitialState = {
        formData: {
            email: '',
            password: ''
        },
        showPassword: false,
        errors: {},
        isLoading: false,
        initialized: false,
        token: ''
    };

    const [state, setState]: [InitialState, React.Dispatch<Partial<InitialState>>] = useReducer(
        (state: InitialState, newState: Partial<InitialState>) => ({ ...state, ...newState }),
        initialState
    );
    const { formData, errors } = state;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState({
            formData: {
                ...formData,
                [name]: value
            },
            errors: {
                ...errors,
                [name]: ''
            }
        });
    }

    const processForm = async() => {
         try {
            setState({
                isLoading: true
            });
            const payload = {
                ...formData,
         
            };
            const {data:{data: {user, token}}} = await AuthServiceApi.createAccount(payload);
    
            const userPayload: IUser = {
                ...user
            };
            dispatch(setActiveUser(userPayload));
            Cookies.set('access_token', token);
            navigate('/home');
            successToast('Registration successful');
        } catch (error) {
            const err = extractErrorMessage(error);
            errorToast(err);
        } finally {
            setState({
                isLoading: false
            });
        }
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
        const rules = {
            password: 'required|min:8|max:30',
            email: 'required|isEmail'
        };
        const messages = {
            'password.required': 'Password is required',
            'email.required': 'Email is required',
            'email.isEmail': 'Valid email is required'
        };

        const validate = await validateData(formData, rules, messages);
        
        if (isObjectEmpty(validate)) {
            processForm();
        } else {
            setState({
                errors: { ...validate }
            });
        }
        
    }
    return (
        <div className="max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-8">Register with CRUD today</h2>
            
            <div className="space-y-4">
                <div>
                    <FormInput 
                        inputName="email" 
                        inputType="email" 
                        label="Email"
                        placeholder="Enter your email"
                        value={formData.email}
                        required
                        errorMessage={errors.email}
                        showErrorMessage={errors.email? true : false}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <FormInput 
                        inputName="password" 
                        inputType="password" 
                        label="Password"
                        placeholder="Enter your password"
                        value={formData.password}
                        required
                        errorMessage={errors.password}
                        showErrorMessage={errors.password? true : false}
                        onChange={handleInputChange}
                    />
                </div>
                
                <Button 
                    action={handleSubmit}
                    text="Register" 
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500"
                    isLoading={state.isLoading}
                />
            </div>

            <p className="mt-4 text-sm text-gray-400 text-center">
                Already have an account?{' '}
                <Link to="/auth/sign-in">
                    <span className="text-white underline cursor-pointer">Login</span>
                </Link>
            </p>

            <p className="mt-6 text-xs text-gray-500 text-center">
                By continuing, you agree to CRUD's{' '}
                <span className="underline cursor-pointer">Terms of Service</span> and{' '}
                <span className="underline cursor-pointer">Privacy Policy</span>
            </p>
            </div>
    );
}

export default RegisterPage;