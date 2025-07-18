import { Provider as ReduxProvider } from "react-redux";
import  { type JSX } from "react";
import store from "appconfig/redux-store";
import { Toaster } from "react-hot-toast";



const Providers = ({ children }: { children: JSX.Element }) => {
  return (
      <ReduxProvider store={store}>
          <Toaster position="top-right" reverseOrder={false} />
          {children}
      </ReduxProvider>
  );
};

export default Providers;