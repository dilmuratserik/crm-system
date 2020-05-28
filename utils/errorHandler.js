module.exports = (res,error) =>{
    res.status(500)({
        success:false,
        message:error.message ? error.message : error
    })
}