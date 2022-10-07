import { readFileSync } from "fs";
try {
    var xl = require("excel4node");
} catch (error) {}

//Bitte sortiert (wie reihenfolge in Excel)
const headLines = {
    Kontonummer: "IBAN Auftragskonto",
    "Kontoauszug Nr.": "AuszugNr",
    Buchungstag: "Buchungstag",
    Wert: "Valutadatum",
    Vorgang: "Buchungstext",
    Verwendungszweck: "Verwendungszweck",
    Kontrahent: "Name Zahlungsbeteiligter",
    "IBAN Kontrahent": "IBAN Zahlungsbeteiligter",
    "BIC Kontrahent": "BIC (SWIFT-Code) Zahlungsbeteiligter",
    MREF: "Mandatsreferenz",
    CRED: "CRED",
    EREF: "EREF",
    ANAM: "ANAM",
    ABWA: "ABWA",
    TAN: "TAN",
    Betrag: "Betrag",
    "Saldo danach": "Saldo nach Buchung",
    Bemerkung: "Bemerkung",
    Kategorie: "Kategorie",
    Steuerrelevant: "Steuerrelevant",
    "MREF aus Verwendungszweck": "MREF",
    "IBAN aus Verwendungszweck": "IBAN",
    "BIC aus Verwendungszweck": "BIC",
    "Glaeubiger ID": "Glaeubiger ID",
};
// let data = JSON.parse(readFileSync("res.json").toString());

export function convertToExcel(data: any, filename: string) {
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet("Buchungen");

    for (let i = 0; i < Object.keys(headLines).length; i++) {
        ws.cell(1, i + 1).string(Object.keys(headLines)[i]);
    }
    for (let j = 0; j < data.length; j++) {
        for (let i = 0; i < Object.keys(headLines).length; i++) {
            let cellData = data[j][headLines[Object.keys(headLines)[i]]];
            if (cellData != null) {
                if (typeof cellData == "number") {
                    ws.cell(j + 2, i + 1).number(cellData);
                } else {
                    ws.cell(j + 2, i + 1).string(cellData.toString());
                }
            }
        }
    }

    wb.write(filename);
}
