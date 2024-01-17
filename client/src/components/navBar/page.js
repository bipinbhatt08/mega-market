'use client'
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle,NavbarMenu,NavbarMenuItem} from "@nextui-org/react";
import { color } from "framer-motion";
import Link from 'next/link'

export default function App() {
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
