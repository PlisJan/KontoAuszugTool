export const getTransactions = /\d\d\.\d\d\./;
export const replaceNewPageText = /[ ]*Übertrag[\s\S]*?WertVorgang/g;
export const replaceLastPageText =
  /[ ]*neuer Kontostand vom[\s\S]*?Grüßen\nIhre Bank/g;
export const getBasicTransactionData =
/(\d\d\.\d\d\.) (\d\d\.\d\d\.) ([a-zA-Z\u0080-\uFFFF\.\/ ]+)[ ]+([\d\.\,]+) ([HS])/;

export const getBasicBankStatemendData = /(\d+)[\n ]+([1]?[0-9]\/\d{4})/;

export const getMREF =
  /MREF:\s?([^:]+) ([a-zA-Z\u0080-\uFFFF]+:)|MREF:\s?([^:]+)$/g;
export const getEREF =
  /EREF:\s?([^:]+) ([a-zA-Z\u0080-\uFFFF]+:)|EREF:\s?([^:]+)$/g;
export const getCRED =
  /CRED:\s?([^:]+) ([a-zA-Z\u0080-\uFFFF]+:)|CRED:\s?([^:]+)$/g;
export const getIBAN =
  /IBAN:\s?([^:]+) ([a-zA-Z\u0080-\uFFFF]+:)|IBAN:\s?([^:]+)$/g;
export const getBIC =
  /BIC:\s?([^:]+) ([a-zA-Z\u0080-\uFFFF]+:)|BIC:\s?([^:]+)$/g;
export const getTAN =
  /TAN:\s?([^:]+) ([a-zA-Z\u0080-\uFFFF]+:)|TAN:\s?([^:]+)$/g;
export const getANAM =
  /ANAM:\s?([^:]+) ([a-zA-Z\u0080-\uFFFF]+:)|ANAM:\s?([^:]+)$/g;
export const getABWA =
  /ABWA:\s?([^:]+) ([a-zA-Z\u0080-\uFFFF]+:)|ABWA:\s?([^:]+)$/g;
