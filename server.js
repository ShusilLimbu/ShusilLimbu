
const express=require('express');
const app=new express();
const path=require('path');
const multer=require('multer');
const upload=multer({dest:'uploads/'});
const Mer=require('./merger.js');

 
const port=process.env.PORT|| 5656;

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
app.use('/static',express.static('public'));

app.get('/',(req,res)=>{


    res.render('dashboard');
});

app.post('/merger',upload.array('pdfs',2),async(req,res)=>{
    console.log(req.files[0].path);
    console.log(req.files[1].path);
    let d=await Mer(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path),req.body.num1,req.body.num2);
    res.redirect(`http://localhost:5656/static/${d}.pdf`);

}); 

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
