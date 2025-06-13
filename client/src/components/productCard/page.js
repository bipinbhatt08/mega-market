'use client'
import { addToCart } from "@/redux/reducerSlice/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiHeart } from "react-icons/ci";
import { useSelector,useDispatch } from 'react-redux';


const Page = (props) => {
  const {isLoggedIn}= useSelector(state=>state.user)
  const dispatch = useDispatch()
  const router = useRouter()
  const {productDetails} = props

  const handleAddTocart = ()=>{
    if(!isLoggedIn){
      return router.push('/login')
    }
    const discountedPrice = productDetails.dicount!==0?(productDetails.price*(100-productDetails.discount)*0.01).toFixed(2):productDetails.price
    productDetails.discountedPrice= discountedPrice
    dispatch(addToCart({productDetails}))
    router.push('/cart')
  }
  return (
    <>
      <div className="w-full px-4 pb-4 lg:w-1/3 md:w-1/2" key={props.key}>
       
        <div className="relative px-2 overflow-hidden bg-white bg-opacity-75 border rounded-lg product-card">
        
            <div className="relative py-2 product-image-container ">
            <img className="object-cover w-full h-full" src={process.env.NEXT_PUBLIC_API_URI+'/productImgs/'+productDetails.productImage} />
           
                <div className='absolute flex w-2/3 top-3 left-3'>
                    {/* <p className='px-2 py-1 text-xs text-center bg-black rounded-md color-white'>Featured</p> */}
                    {
                        props.productDetails.discount>0?<p className='px-2 py-1 ml-1 text-xs text-center bg-red-500 rounded-md color-white'>
                            {props.productDetails.discount}% Off
                        </p>:null
                      } 
                    
                </div>
            </div>

            <div className="p-2 border-t ">
                <p className="pt-1 text-sm text-red-500 ">{props.productDetails.category?.name.toUpperCase()}</p>
                <div className="py-1">
                    <Link href={`/products/${productDetails._id}`}><h1 className='mt-1 font-semibold text-gray-800 transition hover:text-red-500 duration-400'>{props.productDetails.title}</h1></Link>


                    {productDetails.discount!==0?<p className='mt-2 text-sm font-semibold text-grey-500'> Rs <span className="line-through">{props.productDetails.price}</span>/-</p>:null}


                    <p className='py-1 font-semibold text-red-500 '> Rs <span className="">{(productDetails.price*(100-productDetails.discount)*0.01).toFixed(2)}</span>/-</p>
                    <p className='text-sm'>{                    props.productDetails?.description.length > 87 ? props.productDetails?.description.substring(0, 87) + "....." : props.productDetails?.description
}</p>

                </div>
                <div className="flex items-center justify-between w-full pt-3 border-t ">
                    <CiHeart color='red' size={28} className='border border-red-500 rounded cursor-pointer hover:bg-red-100 hover:text-white ' />
                    <button className='px-2 py-1 text-sm text-white bg-red-500 border border-red-500 rounded' onClick={handleAddTocart}>Add to cart  </button>
                </div>

            </div>
        </div>

      </div>
      
    </>
  )
}

export default Page
