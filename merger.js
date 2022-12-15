const PDFmerger=require('pdf-merger-js');
const merger=new PDFmerger();

     let Mer=async(p1,p2)=>{
        await merger.add(p1);
        await merger.add(p2);
        let d=new Date().getTime();
        await merger.save(`public/${d}.pdf`);
        return d;

    };
    module.exports=Mer;
