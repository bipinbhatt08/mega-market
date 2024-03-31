const axios =  require('axios') 
exports.initiatePayment = async(req,res)=>{
    try {
        const website_url = 'http://localhost:3000'
        const return_url =  'http://localhost:3000/success'
        const values = {website_url,return_url,...req.body}
        console.log(values)
        const response= await axios.post(`https://a.khalti.com/api/v2/epayment/initiate/`,values, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Key ${process.env.KHALTI_PAYMENT_LIVE_SECRET_KEY}`
            },
            })
        console.log(response.data)
        res.status(200).json({
            message:"Successfull",
            responseUrl: response.data.payment_url
        })
    } catch (error) {
        console.log("error:",error)
    }
}