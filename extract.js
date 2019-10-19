/* Create a shorter list containing only america an europe cities */
var path = require("path");
var fs = require("fs");

// America & Europe
let countryCodes = {'AL' : true, 'AD' : true, 'AG' : true, 'AZ' : true, 'AR' : true, 'AT' : true, 'BS' : true, 'AM' : true, 'BB' : true, 'BE' : true, 'BM' : true, 'BO' : true, 'BA' : true, 'BR' : true, 'BZ' : true, 'VG' : true, 'BG' : true, 'BY' : true, 'CA' : true, 'KY' : true, 'CL' : true, 'CO' : true, 'CR' : true, 'HR' : true, 'CU' : true, 'CY' : true, 'CZ' : true, 'DK' : true, 'DM' : true, 'DO' : true, 'EC' : true, 'SV' : true, 'EE' : true, 'FO' : true, 'FK' : true, 'FI' : true, 'AX' : true, 'FR' : true, 'GF' : true, 'GE' : true, 'DE' : true, 'GI' : true, 'GR' : true, 'GL' : true, 'GD' : true, 'GP' : true, 'GT' : true, 'GY' : true, 'HT' : true, 'VA' : true, 'HN' : true, 'HU' : true, 'IS' : true, 'IE' : true, 'IT' : true, 'JM' : true, 'KZ' : true, 'LV' : true, 'LI' : true, 'LT' : true, 'LU' : true, 'MT' : true, 'MQ' : true, 'MX' : true, 'MC' : true, 'MD' : true, 'ME' : true, 'MS' : true, 'NL' : true, 'AN' : true, 'CW' : true, 'AW' : true, 'SX' : true, 'BQ' : true, 'NI' : true, 'NO' : true, 'UM' : true, 'PA' : true, 'PY' : true, 'PE' : true, 'PL' : true, 'PT' : true, 'PR' : true, 'RO' : true, 'RU' : true, 'BL' : true, 'KN' : true, 'AI' : true, 'LC' : true, 'MF' : true, 'PM' : true, 'VC' : true, 'SM' : true, 'RS' : true, 'SK' : true, 'SI' : true, 'ES' : true, 'SR' : true, 'SJ' : true, 'SE' : true, 'CH' : true, 'TT' : true, 'TR' : true, 'TC' : true, 'UA' : true, 'MK' : true, 'GB' : true, 'GG' : true, 'JE' : true, 'IM' : true, 'US' : true, 'VI' : true, 'UY' : true, 'VE' : true};

fs.readFile(path.join(__dirname, "/assets/city.list.json"), "utf8", function (err, contents) {
	let places = JSON.parse(contents)
					.filter(place => countryCodes[place.country]) // City must belong to America and Europe
					.map(({id, name, country }) => { return { id, name, country }}); // We just neeed id, name and country code (ES6 - Object destructuring syntax)

	fs.writeFileSync(path.join(__dirname, "/assets/city.short.list.json"), JSON.stringify(places))
});

