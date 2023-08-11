const mongoose=require('mongoose')
const db='mongodb://127.0.0.1:27017/uploadimages'
mongoose.connect(db).then(()=>{
    console.log('connetin success...')
}).catch(()=>{
    console.log('connetion failed with database')
})