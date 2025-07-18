import {  Outlet } from "react-router-dom";

const HomeLayout = () => {

    return(
        <>
         <div className="max-h-screen min-h-screen flex antialiased relative">
              <div className='fixed top-0 z-10 w-full h-16  flex text-dark items-center  justify-between text-center px-5 shadow-md'>
                    <div className="font-bold text-lg text-[#fafafa]">CRUD Portal</div>
                    <div className="">
                        
                       
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