import toast from 'react-hot-toast';
import './toast.scss';

export const successToast = (msg = '') =>
    toast.custom((t) => (
        <div
            className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-[420px] w-full  rounded-lg  pointer-events-auto flex  justify-between toast-container`}
        >
            <div className="flex ">
                <div className="bg-[#DDF7E0] px-3 flex justify-center items-center rounded-l-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22 12C22 17.5228 17.5228 22 12 22H2.9937C2.11018 22 1.66771 20.9229 2.29245 20.2929L4.2495 18.3195C2.84334 16.597 2 14.397 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.7071 10.7071C16.0976 10.3166 16.0976 9.68342 15.7071 9.29289C15.3166 8.90237 14.6834 8.90237 14.2929 9.29289L11 12.5858L9.70711 11.2929C9.31658 10.9024 8.68342 10.9024 8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L10.2929 14.7071C10.4804 14.8946 10.7348 15 11 15C11.2652 15 11.5196 14.8946 11.7071 14.7071L15.7071 10.7071Z"
                            fill="#31C440"
                        />
                    </svg>
                </div>
                <div className="p-4 text-white">
                    <h2 className="text-sm font-semibold"> Success </h2>
                    <p className="text-sm ">{msg}</p>
                </div>
            </div>
            <div className="p-4">
                <span className="cursor-pointer" onClick={() => toast.dismiss(t.id)}>
                    X
                </span>
            </div>
        </div>
    ));

export const errorToast = (msg = '') =>
    toast.custom((t) => (
        <div
            className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-[420px] w-full  rounded-lg  pointer-events-auto flex  justify-between toast-container`}
        >
            <div className="flex ">
                <div className="bg-[#FFDCE4] px-3 flex justify-center items-center rounded-l-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22 12C22 17.5228 17.5228 22 12 22H2.9937C2.11018 22 1.66771 20.9229 2.29245 20.2929L4.2495 18.3195C2.84334 16.597 2 14.397 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.2071 8.79289C15.5976 9.18342 15.5976 9.81658 15.2071 10.2071L13.4142 12L15.2071 13.7929C15.5976 14.1834 15.5976 14.8166 15.2071 15.2071C14.8166 15.5976 14.1834 15.5976 13.7929 15.2071L12 13.4142L10.2071 15.2071C9.81658 15.5976 9.18342 15.5976 8.79289 15.2071C8.40237 14.8166 8.40237 14.1834 8.79289 13.7929L10.5858 12L8.79289 10.2071C8.40237 9.81658 8.40237 9.18342 8.79289 8.79289C9.18342 8.40237 9.81658 8.40237 10.2071 8.79289L12 10.5858L13.7929 8.79289C14.1834 8.40237 14.8166 8.40237 15.2071 8.79289Z"
                            fill="#FF507A"
                        />
                    </svg>
                </div>
                <div className="p-4 text-white">
                    <h2 className="text-sm font-semibold">Error</h2>
                    <p className="text-sm ">{msg}</p>
                </div>
            </div>
            <div className="p-4">
                <span className="cursor-pointer" onClick={() => toast.dismiss(t.id)}>
                    X
                </span>
            </div>
        </div>
    ));

export const warningToast = (msg = '') =>
    toast.custom((t) => (
        <div
            className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-[420px] w-full  rounded-lg  pointer-events-auto flex  justify-between toast-container`}
        >
            <div className="flex ">
                <div className="bg-[#FFF3CC] px-3 flex justify-center items-center rounded-l-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22 12C22 17.5228 17.5228 22 12 22H2.9937C2.11018 22 1.66771 20.9229 2.29245 20.2929L4.2495 18.3195C2.84334 16.597 2 14.397 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12.99 8C12.99 7.44772 12.5446 7 11.995 7C11.4455 7 11 7.44772 11 8V12C11 12.5523 11.4455 13 11.995 13C12.5446 13 12.99 12.5523 12.99 12V8ZM11.995 15C11.4455 15 11 15.4477 11 16C11 16.5523 11.4455 17 11.995 17H12.005C12.5545 17 13 16.5523 13 16C13 15.4477 12.5545 15 12.005 15H11.995Z"
                            fill="#FFC400"
                        />
                    </svg>
                </div>
                <div className="p-4 text-white">
                    <h2 className="text-sm font-semibold">Warning</h2>
                    <p className="text-sm ">{msg}</p>
                </div>
            </div>
            <div className="p-4">
                <span className="cursor-pointer" onClick={() => toast.dismiss(t.id)}>
                    X
                </span>
            </div>
        </div>
    ));
