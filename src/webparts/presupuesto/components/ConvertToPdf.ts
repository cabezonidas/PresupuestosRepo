import * as jsPDF from "jspdf";
import logo from './Logo';
import * as _ from 'lodash';
import HeaderInfo from "./HeaderInfo";
import * as moment from 'moment';

export default function ConvertToPdf (state)  {
    moment.locale('es');
    let products = state.products as Array<any>;
    let headerInfo = state.headerInfo as HeaderInfo;
    let doc = new jsPDF();
    doc = makeHeader(doc, headerInfo);
    doc = makeBody(doc, products);
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
    doc.text(175, 90, 'Subtotal');
    doc.setFont('courier');
    doc.setFontType('normal');
    doc.text(50, 60, stringify(headerInfo.Customer));
    doc.text(50, 68, stringify(headerInfo.CustomerNumber));
    doc.text(50, 76, stringify(headerInfo.CustomerMail));
    doc.text(160, 60, moment().format('L'));
    let deliveryDate = headerInfo.DaliveryDate || '';
    deliveryDate = deliveryDate.toString();
    deliveryDate = deliveryDate != '' ? moment(deliveryDate).format('L') : stringify('-');
    doc.text(160, 68, deliveryDate);
    return doc;  
}

function makeBody(doc: jsPDF, products: Array<any>) {
    let selectedProducts = _.filter(products, o => o.selected == true && o.quantity > 0);
    let startingDots = 100;
    let limitDots = 275;
    selectedProducts.forEach(item => {
        doc.text(20, startingDots, item.quantity.toString().padStart(3));
        doc.text(40, startingDots, item.Title.substring(0,27));
        doc.text(130, startingDots, item.Precio.toFixed(2).toString().padStart(7));   
        let subtotal = (item.quantity * item.Precio).toFixed(2).toString();
        let remainingspaces = '       '.substring(0, 7 - subtotal.length);
        doc.text(170, startingDots, remainingspaces + subtotal);
        startingDots += 10;

        if(startingDots > limitDots) {
            startingDots = 25;
            doc.addPage();
        }
    });
    startingDots += 5;
    let total = (_.sumBy(selectedProducts, (o) => { return o.quantity * o.Precio; })).toFixed(2);   
    doc.setFontSize(24);
    doc.setFont('times');
    doc.setFontType('italic');
    doc.text(20, startingDots, 'Total: ');
    doc.setFont('courier');
    doc.setFontType('normal');
    doc.text(55, startingDots, '$' + total);
    return doc;
}

function stringify(value){
    return value ? value.toString() : '-';
}