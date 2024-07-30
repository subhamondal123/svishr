module.exports.NAME_REGEX                   =           /^[ A-Za-z0-9_@.#&+-]*$/; //  /^[a-zA-Z 0-9]+$/;
module.exports.NAME_SPACE_REGEX             =           /^[a-zA-Z \s]+$/;
module.exports.NUMBER_REGEX                 =           '0123456789';
module.exports.AMOUNT_REGEX                 =           '0123456789.';
module.exports.UPTO_ONE_DECIMAL_REGEX       =           /^(\d+(\.\d{1})?)?$/;
module.exports.LAT_LONG_REGEX                 =           '0123456789.';
// module.exports.PASS_REGEX                   =           /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
module.exports.PASS_REGEX                   =           /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])([a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]{6,})$/;
module.exports.ADDRESS_REGEX                =           /^[_@/#&+-.?!,;:() A-Za-z0-9]*$/;
module.exports.WEB_URI_REGEX                =           '((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)';
module.exports.ALPHA_NUMERIC_REGEX          =           /^[ A-Za-z0-9_@.#&+-]*$/; //  /^[a-zA-Z 0-9]+$/;
module.exports.EMAIL_REGEX                  =           /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;