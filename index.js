const  app = require('./app')
const port = process.env.PORT || 5000
const host = process.env.localhost|| '0.0.0.0'
app.listen(port,host,()=>console.log(`Server has been started on ${port}`))
