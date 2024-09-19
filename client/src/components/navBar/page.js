'use client'
import React from "react";
import {Navbar, NavbarBrand,Tooltip,Badge,Input, NavbarContent, NavbarItem, Button, NavbarMenuToggle,NavbarMenu,NavbarMenuItem,DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, button, link} from "@nextui-org/react";
import { color } from "framer-motion";
import Link from 'next/link'
import { useSelector, useDispatch} from "react-redux";
import { FaCartPlus , FaHeart,} from "react-icons/fa";
import { CiSearch} from "react-icons/ci";
import { logout } from "@/redux/reducerSlice/userSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter()
  const {isLoggedIn,userDetails}= useSelector(state=>state.user)
  console.log(userDetails.role)
  const {products}= useSelector(state=>state.cart)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useDispatch()
  const noOfitemsInCart = Object.keys(products).length;
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
    const UserAvatarDropDown = ()=>{

      const handleLogout =()=>{
        // toast.warning("hello")
        
        dispatch(logout())
        router.push('/login')
      }
      return <>
       <NavbarItem className="hidden lg:flex">
        <Badge content={noOfitemsInCart} shape="circle" color="danger" >
        <Tooltip showArrow={true} color="danger" content="Cart">
        <Button
            as={Link}
            href ="/cart"
            radius="full"
            isIconOnly
            aria-label="more than 99 notifications"
            variant="light"
            >
            <FaCartPlus size={24} color="red" />
          </Button>
        </Tooltip>
        </Badge>
       </NavbarItem>
       <NavbarItem className="mr-2 hidden lg:flex">
       <Badge content="0" shape="circle" color="danger">
       <Tooltip showArrow={true} color="danger" content="Wishlist">
          <Button
            radius="full"
            isIconOnly
            aria-label="more than 99 notifications"
            variant="light"
          >
            <FaHeart size={24} color="red" />
          </Button>
          </Tooltip>
        </Badge>
       </NavbarItem>
    
      <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="danger"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userDetails.email}</p>
            </DropdownItem>
            
              <DropdownItem key="cart"  as={Link} href="/cart">
                Cart
              </DropdownItem>
              <DropdownItem key="orders" as={Link} href="/orders">
                Orders
              </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        
      </>
    }
    const AuthButtons = ()=>{
      return <>
      <NavbarItem >
          {/* <Link href="/register" className="loginBtn">Login</Link> */}
          <Button as={Link}  href="/login"  variant="flat" className="loginBtn">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/register" variant="flat" className="signUpBtn">
            Sign Up
          </Button>
        </NavbarItem>
      </>
    }
    const AdminAvatarDropDown = ()=>{

      const handleLogout =()=>{
        // toast.warning("hello")
        
        dispatch(logout())
        router.push('/login')
      }
      return <>
      <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="danger"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userDetails.email}</p>
            </DropdownItem>
            
              <DropdownItem key="cart"  as={Link} href="/admin/dashboard">
                Dashboard
              </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        
      </>
    }
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered shouldHideOnScroll maxWidth="full" >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link href={'/'}>
          <NavbarBrand >
            <img src="/gharJaggaLogo.png" alt="" height={75} width={75} />
            <p className="font-bold text-inherit hidden lg:flex md:flex">MEGA<span style={{color: "rgb(255,90,95)"}}>MARKET</span></p>
          </NavbarBrand>
        </Link>
     
        <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem>
          <Link color="foreground" href="#" className="nav-item">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/products" className="nav-item">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/category" className="nav-item">
            Categories
          </Link>
        </NavbarItem>
       
        <NavbarItem>
          <Link color="foreground" href="#"  className="nav-item">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      </NavbarContent>

      <NavbarContent justify="end " className=" md:flex lg:flex">
      <NavbarItem  className="hidden md:flex lg:flex">
      <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10 ",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<CiSearch size={18} />}
          type="search"
        />
      </NavbarItem>
        {(!isLoggedIn)?<AuthButtons/>: (userDetails.role=='user')?<UserAvatarDropDown/>:<AdminAvatarDropDown/>
        }
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
