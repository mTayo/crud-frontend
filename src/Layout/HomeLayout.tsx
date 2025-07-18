/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RootState } from "appconfig/redux-store";
import { useAppDispatch, useAppSelector } from "appconfig/redux-store/hooks";
import { setActiveUser } from "appconfig/redux-store/slices/global";
import DropdownMenu from "components/common/DropdownMenu";
import { successToast } from "components/common/Toast";
import {  Outlet, useNavigate } from "react-router-dom";
import { getInitials } from "utils";
import Cookies from 'js-cookie';


const HomeLayout = () => {
    const navigate = useNavigate();
    const {
        user,
        } = useAppSelector((state: RootState) => state.global);
    const dispatch = useAppDispatch();
   
     const toggleLogOutModal = () => {
        const confirm = window.confirm('Are you sure you want to log out?');
    
        if (confirm){
            Cookies.remove('access_token');
            dispatch(setActiveUser({}));
            navigate('/auth/sign-in');
            successToast('Account logged out successfully')
         
        }else{
            return;
        }
    };

  
     const dropdownMenuItems = () => {
        return [
            
            {
                label: 'Log out',
                action: ()=> toggleLogOutModal()
            }
        ];
    };
    return(
        <>
         <div className="max-h-screen min-h-screen flex antialiased relative">
              <div className='fixed top-0 z-10 w-full h-16  flex text-dark items-center  justify-between text-center px-5 shadow-md'>
                    <div className="font-bold text-lg text-[#fafafa]">CRUD Portal</div>
                    <div className="">
                        
                       <div>
                                    <DropdownMenu
                                        data={dropdownMenuItems()}
                                        hasCustomContent
                                        position="bottom-right"
                                        parentClassName=" rounded-[32px]"
                                        anchor= {
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-green-500 flex justify-center text-lg cursor-pointer items-center text-white rounded-full" >
                                                {getInitials(user?.user?.email || '')}
                                            </div>
                                            <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                        </div>
                                        }

                                    />
                                </div>
                    </div>
                </div>
            <div className="w-full  bg-[#171717] text-white  p-8 px-5 pt-16">
                <div className="">
                    <Outlet />
                </div>
            </div>
        </div>
        
        </>
    )
};

export default HomeLayout;