'use client'
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle,NavbarMenu,NavbarMenuItem,DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { color } from "framer-motion";
import Link from 'next/link'
import { useSelector } from "react-redux";

export default function App() {

  const {isLoggedIn}= useSelector(state=>state.user)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={()=>{set}}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </>
    }
    const AuthButtons = ()=>{
      return <>
      <NavbarItem className="hidden lg:flex">
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

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <img src="/gharJaggaLogo.png" alt="" height={75} width={75} />
          <p className="font-bold text-inherit">GHAR<span style={{color: "rgb(255,90,95)"}}>JAGGA</span></p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#" className="nav-item">
            About Us
          </Link>
        </NavbarItem>
       
        <NavbarItem>
          <Link color="foreground" href="#"  className="nav-item">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {(!isLoggedIn)?<AuthButtons/>:<UserAvatarDropDown/>
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
