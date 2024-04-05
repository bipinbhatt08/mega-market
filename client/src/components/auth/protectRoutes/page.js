'use client'

import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import NotFound from "@/app/404";
const SecureRoutes = ({ children }) => {
  const { userDetails } = useSelector(state => state.user);

  const adminRoutes = ['/admin/dashboard','/login','/']; // Remove 'login'
  const publicRoutes = ['/', '/login', '/register', '/products'];
  const userRoutes = ['/orders', '/cart', '/checkout', '/success', ...publicRoutes];

  const currentPage = usePathname();
  console.log("CURRENPAGE", currentPage);

  if(userDetails.role === 'admin'){
    if(adminRoutes.includes(currentPage)){
      return children
    }
    else{
      return <NotFound/>
    }
  }
  if(userDetails.role ==='user'){
    if(userRoutes.includes(currentPage)){
      return children
    }
    else{
      return <NotFound/>
    }
  }
  if(publicRoutes.includes(currentPage)){
    return children
  }else{
    return <NotFound/>
  }
 
};

export default SecureRoutes;
