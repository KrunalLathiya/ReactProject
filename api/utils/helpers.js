const PdfPrinter = require('pdfmake');
const path = require('path');

const fonts = {
    Roboto: {
        normal: path.join(__dirname, 'fonts', 'Roboto-Regular.ttf'),
        bold: path.join(__dirname, 'fonts', 'Roboto-Medium.ttf'),
        italics: path.join(__dirname, 'fonts', 'Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, 'fonts', 'Roboto-MediumItalic.ttf')
    }
};

const printer = new PdfPrinter(fonts);

exports.handleError = (res, err, statusCode = 500) => {
    console.error(err);
    res.status(statusCode).json({ error: err.message });
};

exports.createPdfDocument = (business) => {
    const docDefinition = {
        content: [
            {
                text: 'Business Details',
                style: 'header',
                alignment: 'center',
                margin: [0, 20, 0, 20] // Top, Right, Bottom, Left
            },
            {
                layout: 'lightHorizontalLines', // optional
                table: {
                    headerRows: 1,
                    widths: ['*', 'auto', 100, '*'],
                    body: [
                        [{ text: 'Field', style: 'tableHeader' }, { text: 'Details', style: 'tableHeader', colSpan: 3 }, '', ''],
                        ['Name', { text: business.person_name, colSpan: 3 }, '', ''],
                        ['Business Name', { text: business.business_name, colSpan: 3 }, '', ''],
                        ['GST Number', { text: business.gst_number, colSpan: 3 }, '', ''],
                    ]
                }
            },
            {
                image: business.business_image,
                width: 300,
                alignment: 'center',
                margin: [0, 20, 0, 0] // Top, Right, Bottom, Left
            }
        ],
        styles: {
            header: {
                fontSize: 22,
                bold: true,
                color: '#4A90E2' // Example blue color
            },
            tableHeader: {
                bold: true,
                fontSize: 14,
                color: 'black'
            }
        },
        defaultStyle: {
            font: 'Roboto'
        }
    };
    return printer.createPdfKitDocument(docDefinition);
};