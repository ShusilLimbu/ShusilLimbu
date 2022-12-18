
const express = require('express');
const app = new express();
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {Mer,Mer2,Mer3, Mer4} = require('./merger.js');


const port = process.env.PORT || 5656;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('dashboard',{error:'Welcome to PDF Merger'});
});

app.post('/merger', upload.array('pdfs', 2), async (req, res) => {
    console.log(typeof(req.body.Fnum1));
    console.log("Fnum1"+req.body.Fnum1);
    console.log("Fnum2"+req.body.Fnum2);
    console.log("Snum1"+req.body.Snum1);
    console.log("Snum1"+req.body.Snum2);
    console.log(Number.isInteger(parseInt(req.body.Fnum1)));

    if(Number.isInteger(Number.parseInt(req.body.Fnum2))&&Number.isInteger(Number.parseInt(req.body.Snum2))){
    
        let d = await Mer(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path), req.body.Fnum1, req.body.Fnum2, req.body.Snum1, req.body.Snum2);
        res.redirect(`http://localhost:5656/static/${d}.pdf`);
    }
    
    else if(req.body.Fnum1=='' && req.body.Snum1==''){
        let d=await Mer4(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));
        res.redirect(`http://localhost:5656/static/${d}.pdf`);
    }
    else if(req.body.Snum1=='' && Number.isInteger(parseInt(req.body.Fnum1))){
        let d = await Mer2(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path), req.body.Fnum1, req.body.Fnum2);
        res.redirect(`http://localhost:5656/static/${d}.pdf`);
    }
    else if(req.body.Fnum1=='' && Number.isInteger(parseInt(req.body.Snum1))){
        let d = await Mer3(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path), req.body.Snum1, req.body.Snum2);
        res.redirect(`http://localhost:5656/static/${d}.pdf`);
    }

    else{
        res.render('dashboard',{error:"** Error while selecting !!"});
    }
    
    
    // let d = await Mer(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path), req.body.Fnum1, req.body.Fnum2, req.body.Snum1, req.body.Snum2);
    // res.redirect(`http://localhost:5656/static/${d}.pdf`);

});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
