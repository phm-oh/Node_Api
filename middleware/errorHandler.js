module.exports = (err,req,res,next)=>{

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message:err.message,
    status_code:statusCode,
    validation:err.validation
  })
}