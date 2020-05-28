const  app = require('./app')
const port = process.env.PORT
app.listen(port,()=>console.log(`Server has been started on ${port}`))