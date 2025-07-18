import { useAppDispatch, useAppSelector } from 'appconfig/redux-store/hooks';
// Update the import path below if your store file is located elsewhere

import { errorToast } from 'components/common/Toast';
import React, {  useEffect } from 'react';
import { AuthServiceApi } from 'services/auth.service';
import { extractErrorMessage } from 'utils';
import HashLoader from "react-spinners/HashLoader"
import { TaskServiceApi } from 'services/task.service';
import { setActiveUser, setAppInitialized, setTaskReport } from 'appconfig/redux-store/slices/global';
import type { RootState } from 'appconfig/redux-store';

const AppProvider: React.FC<React.PropsWithChildren<object>> = (props) => {
    const { children } = props;
    const dispatch = useAppDispatch();

    const {
        appInitialized,
    } = useAppSelector((state: RootState) => state.global);

    const fetchAppData = async () => {
        try {
            const fetchDataRequest = await Promise.allSettled([
                AuthServiceApi.getCurrentUser(),
                TaskServiceApi.fetchReports()
            ]);
            if (fetchDataRequest[0].status === 'fulfilled') {
                dispatch(setActiveUser(fetchDataRequest[0].value?.data?.data || {}));
            } else {
                dispatch(setActiveUser({}));
            }
            if (fetchDataRequest[1].status === 'fulfilled') {
                dispatch(setTaskReport(fetchDataRequest[1].value?.data?.data || {}));
            }
            dispatch(setAppInitialized(true))
   
        } catch (error) {
            errorToast(extractErrorMessage(error));
        } finally {
            dispatch(setAppInitialized(true));
        }
    };

    useEffect(() => {
        fetchAppData();
    }, []);

    return (
        <div>
            {appInitialized ? 
                (<div>{children}</div>) : (
                    <>
                        <div className="max-h-screen min-h-screen flex antialiased relative">
                        <div className='fixed top-0 z-10 w-full h-16  flex text-dark items-center  justify-between text-center px-5 shadow-md'>
                                <div className="font-bold text-lg text-[#fafafa]">CRUD Portal</div>
                                <div className="">
                                    
                                
                                </div>
                            </div>
                            <div className="w-full  bg-[#171717] text-white flex items-center justify-center p-8">
                                <div className="">
                                    <HashLoader color="#3ecf8e" size={100} />
                                </div>
                            </div>
                        </div>
                        
                    </>
                )}
        </div>);
};
export default React.memo(AppProvider);
