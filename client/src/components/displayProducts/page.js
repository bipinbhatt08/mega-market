'use client'
const { Table,  } = require("antd")
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { toast } from "react-toastify";
import AddProduct from "@/components/editProduct/page";
const DisplayProducts = ({products,productEdited,setProductEdited}) =>{
  const handleDelete=async(id,onClose)=>{
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,{
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      })
      const data = await res.json()
      if(res.status!==200){
        return toast.warning(data.message)
        
      }
      toast.success(data.message)
      setProductEdited(!productEdited)
      onClose()
  }
  
  const DeleteModal=({productId,handleDelete})=> {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
      <>
        <Button onPress={onOpen} className="signUpBtn">Delete</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody>
                  <p> 
                    Delete the product?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <div className='w-full  '>
                    <Button className='  text-red-500 border border-red-500 bg-white rounded-md  hover:bg-red-50  ' variant="flat" >
                      Cancel
                      </Button>
                      <Button  variant="flat"   type="submit"  className="signUpBtn ml-3  mb-3 rounded-md  " onClick={()=>handleDelete(productId,onClose)}  >
                      Delete 
                      </Button>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  const EditModal=({productId,setProductEdited,productEdited})=> {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
      <>
        <Button onPress={onOpen} className="loginBtn mr-3">Edit</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
          <ModalContent>
          {(onClose) => (
            <AddProduct productId={productId} onClose={onClose} setProductEdited={setProductEdited} productEdited={productEdited}/>
            )}
          </ModalContent>
          
        </Modal>
      </>
    );
  }
    const columns = [
      {
        title: 'S.N.',
        dataIndex: 'sn',
        key: 'sn',
      },
      
      
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      
      {
        title: 'Stock ',
        dataIndex: 'stockQty',
        key: 'stockQty',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      
      {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discoutn',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Sold',
        dataIndex: 'sale',
        key: 'sale',
      },
      
      {
        title: 'Action',
        key: 'action',
        dataIndex: "action"
      },
    ]
    const data = products.map((product,id)=>{
      const obj = {
        key:product._id,
        sn: id +1 ,
        title:product.title ,
        price: product.price,
        stockQty:product.quantity,
        discount:product.discount,
        category:product.category,
        sale:'40',
        action :  <><EditModal productId={product._id}  productEdited={productEdited} setProductEdited={setProductEdited} className='mr-3'>Edit</EditModal><DeleteModal productId={product._id} handleDelete={handleDelete}/></>,
      }
      return obj
    })
    return (
    <Table columns={columns} dataSource={data} pagination={{position:['none']} } scroll={{x:5}}  />
  )
  }
  export default DisplayProducts