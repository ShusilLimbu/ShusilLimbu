const PDFMerger = require('pdf-merger-js');
const merger = new PDFMerger();

//if Fnum1 and Snum2 are available
let Mer = async (p1, p2, f1, f2, s1, s2) => {
    await merger.add(p1, [f1, f2]);
    await merger.add(p2, [s1, s2]);
    let d = new Date().getTime();
    await merger.save(`public/${d}.pdf`);
    return d;
};
//if Snum1==''
let Mer2 = async (p1, p2, f1, f2) => {
    await merger.add(p1, [f1, f2]);
    await merger.add(p2);
    let d = new Date().getTime();
    await merger.save(`public/${d}.pdf`);
    return d;
};
//if Fnum1==''
let Mer3 = async (p1,p2,s1,s2)=>{
    console.log(s1, s2);
    await merger.add(p1);
    await merger.add(p2,[s1,s2]);
    let d = new Date().getTime();
    await merger.save(`public/${d}.pdf`);
    return d;
};
//if Fnum1 and Snum1 ==''
let Mer4 = async (p1, p2) => {
    await merger.add(p1);
    await merger.add(p2);
    let d = new Date().getTime();
    await merger.save(`public/${d}.pdf`);
    return d;
};



module.exports = { Mer, Mer2, Mer3, Mer4 };





