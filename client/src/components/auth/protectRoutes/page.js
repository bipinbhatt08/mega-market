'use client'

import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import NotFound from "@/app/404";
const SecureRoutes = ({ children }) => {
  const { userDetails } = useSelector(state => state.user);

  const adminRoutes = ['/admin/dashboard','/login','/products']; // Remove 'login'
  const publicRoutes = ['/', '/login', '/register', '/products','/products/[id]','/category'];
  const userRoutes = ['/orders', '/cart', '/orders/[id]','/checkout', '/success', ...publicRoutes];
  const currentPage = usePathname();
  console.log("CURRENTPAGE", currentPage);

  if(userDetails.role === 'admin'){
    if(adminRoutes.includes(currentPage)){
      return children
    }
    else{
      return <NotFound/>
    }
  }
  if(userDetails.role ==='user'){
    if(userRoutes.includes(currentPage)|| currentPage.startsWith("/products/")|| currentPage.startsWith("/orders/")){
      return children
    }
    else{
      return <NotFound/>
    }
  }
  if(publicRoutes.includes(currentPage)|| currentPage.startsWith("/products/")){
    return children
  }else{
    return <NotFound/>
  }
 
};

export default SecureRoutes;
