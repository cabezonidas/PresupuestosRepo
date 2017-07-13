
import * as jsPDF from "jspdf";
import logo from './Logo';
import * as _ from 'lodash';
import HeaderInfo from "./HeaderInfo";



export default function ConvertToPdf (state)  {
    let products = state.products as Array<any>;
    let headerInfo = state.headerInfo as HeaderInfo;
    let doc = new jsPDF();
    doc = makeHeader(doc, headerInfo);
    return doc;
}

function makeHeader(doc: jsPDF, headerInfo: HeaderInfo) {
    doc.addImage(logo.datauri, 'JPEG', 20, 15, 44, 22);
    doc.setFontSize(22);
    doc.setFont('times');
    doc.setFontType('italic');
    doc.text(20, 48, 'Presupuesto');
    doc.setFontSize(15);
    doc.text(159, 23, 'J M Moreno 561');
    doc.text(161, 29, 'Tel. 4925-0262');
    doc.text(130, 35, 'fb.com/ReposteriaDeLasArtes');
    doc.text(20, 60, 'Cliente:');
    doc.text(20, 68, 'Contacto:');
    doc.text(20, 76, 'Mail:');
    doc.text(140, 60, 'Fecha:');
    doc.text(140, 68, 'Entrega:');
    doc.text(20, 90, 'Cant.');
    doc.text(40, 90, 'Producto');
    doc.text(130, 90, 'Precio U.');
    doc.text(170, 90, 'Subtotal');
    doc.setFont('courier');
    doc.setFontType('normal');
    doc.text(50, 60, formatvalues(headerInfo.Customer));
    doc.text(50, 68, formatvalues(headerInfo.CustomerNumber));
    doc.text(50, 76, formatvalues(headerInfo.CustomerMail));
    doc.text(160, 60, formatvalues(headerInfo.DaliveryDate));
    doc.text(160, 68, formatvalues(new Date()));
    return doc;  
}


function formatvalues(value){
    return value ? value.toString() : '-';
}

// You'll need to make your image into a Data URL
// Use http://dataurl.net/#dataurlmaker
/*const PresupuesToPdf = () => {

var imgData = logo.datauri;
var doc = new jsPDF()

doc.setFontSize(40)
doc.addImage(imgData, 'JPEG', 20, 15, 44, 22)

doc.setFontSize(22)
doc.setFont('times')
doc.setFontType('italic')
doc.text(20, 48, 'Presupuesto')

doc.setFontSize(15)

doc.text(159, 23, 'J M Moreno 561')
doc.text(161, 29, 'Tel. 4925-0262')
doc.text(130, 35, 'fb.com/ReposteriaDeLasArtes')

doc.text(20, 60, 'Cliente:')
doc.text(20, 68, 'Contacto:')
doc.text(20, 76, 'Mail:')

doc.text(140, 60, 'Fecha:')
doc.text(140, 68, 'Entrega:')


doc.text(20, 90, 'Cant.')
doc.text(40, 90, 'Producto')
doc.text(130, 90, 'Precio U.')
doc.text(170, 90, 'Subtotal')

doc.setFont('courier')
doc.setFontType('normal')


doc.text(50, 60, 'Julio Barbaro')
doc.text(50, 68, '159386213')
doc.text(50, 76, 'vagancia@gmail.com')

doc.text(160, 60, '01/07/2017')
doc.text(160, 68, '12/12/2017')



doc.text(20, 100, '3')
doc.text(40, 100, 'Arrolladitos de piono123456')
doc.text(130, 100, '13.50')
doc.text(170, 100, '20.50')

doc.text(20, 110, '36')
doc.text(40, 110, 'Triples Crudo y Queso')
doc.text(130, 110, ' 6.50')
doc.text(170,280, '234.00')

//tope es 280



doc.addPage()
doc.text(20, 20, 'Second Page')

return doc;*/


