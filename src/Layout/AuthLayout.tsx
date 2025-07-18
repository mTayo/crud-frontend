import {  Outlet } from "react-router-dom";

const AuthLayout = () => {

    return(
        <>
        
         <div className="max-h-screen min-h-screen flex antialiased relative">

            <div className="w-full md:w-1/2 bg-[#171717] text-white flex items-center justify-center p-8">
                <div className="">
                    <Outlet />
                </div>
            </div>

      {/* Right side: Quote */}
        <div className="hidden md:flex w-1/2 bg-[#171717] text-white items-center justify-center p-12">
            <div className="max-w-md text-center">
            <p className="text-xl italic mb-4">
                “Working on my next  app and I i use CRUD to put all my tasks  together . <span className="text-green-400">@CRUD</span> and chill, if you will”
            </p>
            <div className="flex items-center justify-center gap-2">
                <img
                src="https://avatars.githubusercontent.com/u/2212006"
                alt="Drew"
                className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-400">@Clement</span>
            </div>
            </div>
        </div>
    </div>
        
            
        </>
    )
};

export default AuthLayout;