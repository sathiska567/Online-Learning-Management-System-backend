const JWT = require('jsonwebtoken')

module.exports = async(req,res,next) => {

  try {

   const token = req.headers["authorization"].split(' ')[1]
   console.log(token);
   

   JWT.verify(token , process.env.SECRETE_KEY , (err,decode)=>{
      if (err) {
        return res.status(400).send({
           success : false,
           message : "Auth Failed",
           err
        })        
      }
      else{
        console.log(decode);
        
        req.body.email = decode.email
        next();
      }
   })

  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success : false,
      error,
      message : "Auth Failed"
    })
    
  }

}