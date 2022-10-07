const csv = require("csv-parser");
const fs = require("fs");
import * as Regexpr from "./Regexp";
import { convertToExcel } from "./ExcelHelper";
import moment = require("moment");
import { writeFileSync } from "fs";
const results = [];

function exec2(exp: RegExp, str: string): [string, string | null] {
    let data = exp.exec(str);
    let newBetreff = str.replace(exp, "$2");
    if (data != null) {
        if (data[1] == null) {
            return [newBetreff, data[3].replace(/\s/g, "")];
        } else if (data[3] == null) {
            return [newBetreff, data[1].replace(/\s/g, "")];
        }
    }
    return [newBetreff, null];
}

let jsonData = [];

fs.readdirSync("CSV_Files").forEach((file) => {
    console.log("Starting conversion of " + "./CSV_Files/" + file);
    processCSV("./CSV_Files/" + file).then((processedTransactions) => {
        jsonData = jsonData.concat(processedTransactions);
        convertToExcel(jsonData, "Excel.xlsx");
        // writeFileSync("res.json", JSON.stringify(jsonData));
        console.log("Finished conversion of " + "./CSV_Files/" + file);
    });
});

async function processCSV(filename: string) {
    let dataStream = fs
        .createReadStream(filename)
        .pipe(csv({ separator: ";" }));
    dataStream.on("data", (data) => {
        data.Betrag = parseFloat(
            (data.Betrag as string).replace(".", "").replace(",", ".")
        );
        data["Saldo nach Buchung"] = parseFloat(
            (data["Saldo nach Buchung"] as string)
                .replace(".", "")
                .replace(",", ".")
        );

        data.AuszugNr = moment(data.Valutadatum, "DD.MM.YYYY").month() + 1;

        let newMref = "";
        [data.Verwendungszweck, newMref] = exec2(
            Regexpr.getMREF,
            data.Verwendungszweck
        );
        if (data.Mandatsreferenz != "" && data.Mandatsreferenz != newMref) {
            data.MREF = newMref;
        } else {
            data.Mandatsreferenz = newMref;
        }
        [data.Verwendungszweck, data.EREF] = exec2(
            Regexpr.getEREF,
            data.Verwendungszweck
        );
        [data.Verwendungszweck, data.CRED] = exec2(
            Regexpr.getCRED,
            data.Verwendungszweck
        );

        // ******************************** Get IBAN from Verwendungszweck ********************************
        let newIban = "";
        [data.Verwendungszweck, newIban] = exec2(
            Regexpr.getIBAN,
            data.Verwendungszweck
        );
        if (
            data["IBAN Zahlungsbeteiligter"] != "" &&
            data["IBAN Zahlungsbeteiligter"] != newIban
        ) {
            data.IBAN = newIban;
        } else {
            data["IBAN Zahlungsbeteiligter"] = newIban;
        }

        // ******************************** Get BIC from Verwendungszweck ********************************
        let newBic = "";
        [data.Verwendungszweck, newBic] = exec2(
            Regexpr.getBIC,
            data.Verwendungszweck
        );
        if (
            data["BIC (SWIFT-Code) Zahlungsbeteiligter"] != "" &&
            data["BIC (SWIFT-Code) Zahlungsbeteiligter"] != newBic
        ) {
            data.BIC = newBic;
        } else {
            data["BIC (SWIFT-Code) Zahlungsbeteiligter"] = newBic;
        }

        [data.Verwendungszweck, data.TAN] = exec2(
            Regexpr.getTAN,
            data.Verwendungszweck
        );
        [data.Verwendungszweck, data.ABWA] = exec2(
            Regexpr.getABWA,
            data.Verwendungszweck
        );
        [data.Verwendungszweck, data.ANAM] = exec2(
            Regexpr.getANAM,
            data.Verwendungszweck
        );
        results.push(data);
    });
    var end = new Promise(function (resolve, reject) {
        dataStream.on("end", () => {
            resolve(results);
        });
        dataStream.on("error", reject); // or something like that. might need to close `hash`
    });
    return end;
}
