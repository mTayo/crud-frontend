import { createBrowserRouter } from 'react-router-dom';
import {
    AuthRoutes,
    HomeRoutes
} from './app-route';

// ===========================|| ROUTING RENDER ||=========================== //


const router = createBrowserRouter([AuthRoutes,HomeRoutes]);
  
export default router;
  
