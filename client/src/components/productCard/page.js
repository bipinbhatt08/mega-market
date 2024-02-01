'use client'
import { addToCart } from "@/redux/reducerSlice/cartSlice";
import { useRouter } from "next/navigation";
import { CiHeart } from "react-icons/ci";
import { useSelector,useDispatch } from 'react-redux';


const page = (props) => {
  const {isLoggedIn}= useSelector(state=>state.user)
  const dispatch = useDispatch()
  const router = useRouter()
  const {productDetails} = props

  const handleAddTocart = ()=>{
    if(!isLoggedIn){
      return router.push('/login')
    }
    
    console.log(productDetails._id)
    dispatch(addToCart({productDetails}))
    router.push('/')
  }
  return (
    <>
      <div className="p-4 lg:w-1/3 ">
        <div className=" bg-white border product-card  bg-opacity-75 p-2 rounded-lg  overflow-hidden  relative">
            <div className="product-image-container py-3 relative  ">
                    <img className="h-full w-full object-contain" src={props.productDetails.imageUrl}/>
                <div className='flex  w-2/3 absolute top-3 left-3'>
                    {/* <p className=' color-white  text-center text-xs  py-1 px-2 bg-black  rounded-md'>Featured</p> */}
                    <p className='  color-white   ml-1 py-1 px-2 text-xs  bg-red-500  text-center rounded-md'>20% Off</p>
                </div>
            </div>

            <div className="p-2 border-t ">
                <p className="text-red-500 text-sm pt-1 ">{props.productDetails.category}</p>
                <div className="py-1">
                    <h1 className='font-semibold text-gray-800'>{props.productDetails.title}</h1>
                    <h2 className='py-1 text-grey-500 font-semibold'> Rs {props.productDetails.price}/-</h2>
                    <p className='text-sm'>{props.productDetails.description}</p>
                </div>
                <div className="border-t flex  justify-between items-center pt-3  w-full ">
                    <CiHeart color='red' size={28} className='cursor-pointer border border-red-500 rounded hover:bg-red-100  hover:text-white ' />
                    <button className='border border-red-500 text-white bg-red-500 rounded text-sm  py-1 px-2' onClick={handleAddTocart}>Add to cart  </button>
                </div>
            </div>
        </div>

      </div>
      
    </>
  )
}

export default page
