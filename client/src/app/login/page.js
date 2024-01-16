'use client'
import NavBar from "@/components/navBar/page"
import Footer from "@/components/footer/page"
import BreadCrumb from "@/components/breadcrumb/page"
import { Input, Button,Link} from "@nextui-org/react"
export default function Home() {
  return (
    <>
        <NavBar/>
        <BreadCrumb page="Login" />
        <div className=" container mx-auto mt-5 form-container p-5" >
            <h2 className="tracking-widest text-md  font-sm text-center mb-1 lg:mt-5 color-red">Login</h2>
            <h1 className="sm:text-2xl text-xl font-medium text-gray-900  text-center ">Sign in to your account </h1>
            <form action="" className=" lg:w-1/2 md:w-2/3 sm:w-full container mx-auto columns-1 px-5 login-form">
                <Input type="email" variant="bordered" label="Email"  size="sm"  radius="sm" className="mb-3" isRequired />
                <Input type="password" variant="bordered" label="Password"  size="sm"  radius="sm"  className="mb-3 " isRequired/>
                <Button  variant="flat" fullWidth type="submit" className="signUpBtn mt-3 mb-3" >
                  Login
                </Button>
                <p className="text-center ">Do not have account? <Link href="/register"className="color-red">Login</Link></p>
            </form>
        </div>
        <Footer/>
    </>
  )
}
