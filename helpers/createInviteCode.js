import JsBarcode from 'jsbarcode';
import { DOMImplementation, XMLSerializer } from 'xmldom';

const xmlSerializer = new XMLSerializer();
const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

const getInviteCode = (code) => {
    JsBarcode(svgNode, code, {
        xmlDocument: document,
    });

    return xmlSerializer.serializeToString(svgNode);
}

export default getInviteCode;
