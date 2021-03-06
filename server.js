const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8888;
app.use('/api',require('./routes/index'));
app.use('/images',express.static(path.join(__dirname,'public/plants-images')));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}
app.listen(port,console.log(`Server is listening on port ${port}`));


