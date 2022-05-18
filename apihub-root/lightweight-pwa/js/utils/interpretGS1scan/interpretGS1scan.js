/*
  A set of functions for interpreting the string of data in various GS1 formats, as found in barcodes of different types
  It depends on the GS1 Digital Link toolkit
  If there are no errors, the interpretScan function returns an object as follows

  AIbrackets: The equivalent GS1 element string in human-readable AI syntax
  AIfnc1: The equivalent GS1 element string in AI syntax with FNC1 (as used in barcodes)
  dl: The equivalent GS1 Digital Link URL (on id.gs1.org)
  ol: An ordered array of objects parsed/interpreted from the input string:
    ai:    the GS1 Application Identifier
    label: what that AI is used for
    value: the value

  The order for the ol list matches that found in a GS1 Digital Link URI
    - primary identifier
    - any applicable qualifiers
    - any data attributes
    - any non-GS1 AIs and their values

  Simply pass the string to be interpreted to the interpretScan() function.

  It can handle any of the 3 formats:
    - Human readable AI syntax
    - Pure AI syntax
    - GS1 Digital Link

  If the input string cannot be interpreted, i.e. it's not a valid GS1 string, then the returned object
  has a value for errmsg which is the system error message.

*/

/* This first mini function tests the incoming string against the monster regular expression that assesses whether the incoming string is plausibly a GS1 DL URI
It DOES NOT guarantee that a true response *is* is GS1 DL URI, but will reject a lot that it knows to be false.
This RegEx is included in version 1.2 of Digital Link: URI Syntax. All improvements welcome.

The initial pattern matches the structure of a URL (http or https) including the little-used but possible inclusion of passwords and port numbers.

^https?:(\/\/((([^\/?#]*)@)?([^\/?#:]*)(:([^\/?#]*))?))?

Next we want to test for the presence of a path component containing a primary key (which may follow aribitrary other path segments). This can be either in its numeric form or its convenience string equivalent. We further want to test that the path segment following the primary key:

•	Is a string beginning with at least 4 digits.
•	Is followed optionally zero or more repetitions of:
  o	a literal forward slash;
  o	one or more characters of which none are a literal forward slash;
  o	another literal forward slash;
  o	one or more characters of which none are a literal forward slash.

Furthermore:

•	A trailing forward slash is allowed at the end of the URI path info (strictly speaking forbidden by the ABNF grammar for DL but is tolerable)
•	Anything following the path is within the structure of a URL with a query string and fragment identifier.

These rules are expressed in the following pattern

([^?#]*)(\/(01|gtin|8006|itip|8013|gmn|8010|cpid|414|gln|417|party|8017|gsrnp|8018|gsrn|255|gcn|00|sscc|253|gdti|401|ginc|402|gsin|8003|grai|8004|giai)\/)(\d{4}[^\/]+)(\/[^/]+\/[^/]+)?[/]?(\?([^?\n]*))?(#([^\n]*))?

A final complexity is that a GS1 DL URI may be compressed [DL-Compression]. The path of a compressed GS1 DL URI will:

•	Contain at least 10 characters from the base 64 safe set (digits, upper and lower case Latin letters, _ -)
•	No other characters (including path separators, querystrings and fragments)

These features are tested by

\/[0-9A-Za-z_-]{10,}$

Therefore, the path of a GS1 DL URI will match either of the previous two patterns.

Concatenating these gives the full RegEx.
*/

import GS1DigitalLinkToolkit from "../GS1DigitalLinkToolkit/GS1DigitalLinkToolkit.js";

const plausibleGs1DlUriRegEx = /^https?:(\/\/((([^\/?#]*)@)?([^\/?#:]*)(:([^\/?#]*))?))?((([^?#]*)(\/(01|gtin|8006|itip|8013|gmn|8010|cpid|414|gln|417|party|8017|gsrnp|8018|gsrn|255|gcn|00|sscc|253|gdti|401|ginc|402|gsin|8003|grai|8004|giai)\/)(\d{4}[^\/]+)(\/[^/]+\/[^/]+)?[/]?(\?([^?\n]*))?(#([^\n]*))?)|(\/[0-9A-Za-z_-]{10,}$))/;

const plausibleCompressedGs1DlUriRegEx = /^https?:(\/\/((([^\/?#]*)@)?([^\/?#:]*)(:([^\/?#]*))?))?\/[0-9A-Za-z_-]{10,}$/;

const gs1Url = 'https://id.gs1.orgx';


function isPlausibleGs1DlUri(s) {
    return plausibleGs1DlUriRegEx.test(s);
}


function interpretScan(scan) {
    function throwError(message){
        throw {
            message,
            dlOrderedAIlist
        }
    }
    let re = /\((\d{2,4}?)\)/g;
    const toBeReplaced = [];
    const toBeRemoved = [];
    const matches = scan.matchAll(re);
    for (const match of matches) {
        toBeReplaced.push(match.index);
        toBeRemoved.push(match.index + match[0].length - 1);
    }
    let newScan = [...scan];
    toBeReplaced.forEach(index => newScan.splice(index, 1, String.fromCharCode(29)));
    for (let i = toBeRemoved.length -1; i >= 0; i--){
        newScan.splice(toBeRemoved[i],1);
    }
    scan = newScan.join('');
    let gtinRE = /^(\d{8})$|^(\d{12,14})$/;
    let e, gs1DigitalLinkURI, gs1ElementStrings, gs1Array, primaryKey, AIstringBrackets, AIstringFNC1, errmsg, gs1dlt;
    let dlOrderedAIlist = [];
    let dateAIs = ['11', '12', '13', '15', '17'];

    if (e = scan.match(gtinRE)) {  // So we just have a GTIN (from an EAN/UPC probably)
        scan = '(01)' + scan;
    } else if (scan.indexOf(String.fromCharCode(29)) == 0) {
        scan = scan.substring(1);
    }
    try {
        gs1dlt = new GS1DigitalLinkToolkit();
        if (isPlausibleGs1DlUri(scan)) {
            if (plausibleCompressedGs1DlUriRegEx.test(scan)) {
                scan = gs1dlt.decompressGS1DigitalLink(scan,false, gs1Url);  // Decompress if it's likely to be compressed
            }
            try {
                gs1ElementStrings = gs1dlt.gs1digitalLinkToGS1elementStrings(scan, true);
                gs1DigitalLinkURI = scan;
            } catch(err) {
                throwError(err.message);
            }
        } else {
            try {
                gs1DigitalLinkURI = gs1dlt.gs1ElementStringsToGS1DigitalLink(scan, false, gs1Url);
            } catch(err) {
                throwError(err.message);
            }
        }
        //    console.log('We have a DL of ' + gs1DigitalLinkURI);
    } catch(err) {
        throwError(err.message);
    }

    // Whatever the input, we have a DL or an error. If an error, the value of gs1DigitalLinkURI is undefined
    if (gs1DigitalLinkURI == undefined) {
        throwError(errmsg);
    } else {
        try {
            gs1Array = gs1dlt.extractFromGS1digitalLink(gs1DigitalLinkURI);
        } catch(err) {
            throwError(err.message);
        }

        // Want to find the primary identifier
        // We'll use the aitable
        let done = [];  // Use this to keep track of what we've done
        for (let i in gs1Array.GS1) {
            if (gs1dlt.aitable.find(x => x.ai === i).type === 'I') {
                primaryKey = i;
                dlOrderedAIlist.push(getAIElement(i, gs1dlt, gs1Array.GS1, dateAIs));
                done.push(i);
            }
        }
        if (gs1dlt.aiQualifiers[primaryKey] !== undefined) {
            gs1dlt.aiQualifiers[primaryKey].forEach(function(i) {
                if (gs1Array.GS1[i] !== undefined) {
                    dlOrderedAIlist.push(getAIElement(i, gs1dlt, gs1Array.GS1, dateAIs));
                    done.push(i);
                }
            });
        }
        //console.log(dlOrderedAIlist); // These are the ones we have already got. We need to get the rest but these can be in any order
        for (let i in gs1Array.GS1) {
            if (!done.includes(i)) {
                dlOrderedAIlist.push(getAIElement(i, gs1dlt, gs1Array.GS1, dateAIs));
                done.push(i);
            }
        }
        for (let i in gs1Array.other) { // These are the non-GS1 elements that can occur in a DL URI. We don't know the labels
            if (!dlOrderedAIlist.includes(i)) {
                let temp = {};
                temp['ai'] = i;
                temp['value'] = gs1Array.other[i];
                dlOrderedAIlist.push(temp);
                done.push(i);
            }
        }
        let returnObject = sortElementString(gs1Array.GS1);
        returnObject['ol'] = dlOrderedAIlist;
        returnObject['dl'] = gs1DigitalLinkURI;
        return returnObject;
    }
}


function getAIElement(e, gs1dlt, values, dateAIs) {
    let ro = {};
    ro['ai'] = e;
    ro['label'] = gs1dlt.aitable.find(x => x.ai === e).label;
    ro['value'] = dateAIs.includes(e) ? gs1ToISO(values[e]) : values[e];
    return ro;
}


function sortElementString(a) {
    // This creates two GS1 element string versions of the given array, one with brackets, one with FNC1
    // Order is:
    // Primary key
    // Fixed length
    // The rest

    let gs1dlt = new GS1DigitalLinkToolkit();
    let sortedBrackets = '';
    let sortedFNC1 = '';
//  const FNC1 = String.fromCharCode(29);
    const FNC1 = gs1dlt.groupSeparator;
    for (let i in a) {    // Look for the primary key
        if (gs1dlt.aitable.find(x => x.ai == i).type == 'I') {
            sortedBrackets = '(' + i + ')' + a[i];
            sortedFNC1 = FNC1 + i + a[i];
        }
    }
    for (let i in a) {    // Look for fixed length AIs
        if ((sortedBrackets.indexOf('('+ i + ')') == -1) && (gs1dlt.aitable.find(x => x.ai == i).fixedLength == true)) {
            sortedBrackets += '(' + i + ')' + a[i];
            sortedFNC1 += i + a[i];
        }
    }
    for (let i in a) {    // Everything else
        if (sortedBrackets.indexOf('('+ i + ')') == -1) {
            sortedBrackets += '(' + i + ')' + a[i];
            sortedFNC1 += i + a[i] + FNC1;
        }
    }
    if (sortedFNC1.lastIndexOf(FNC1) == sortedFNC1.length -1) { sortedFNC1 = sortedFNC1.substring(0, sortedFNC1.length -1)}
    return {'AIbrackets' : sortedBrackets, 'AIfnc1' : sortedFNC1}
}
function gs1ToISO(gs1Date) {
    let rv="";
    let regexDate= new RegExp("^\\d{6}$");
    if (gs1Date !== undefined && regexDate.test(gs1Date)) {
        let doubleDigits = gs1Date.split(/(\d{2})/);
        let year=parseInt(doubleDigits[1]);
        let currentYear=new Date().getFullYear().toString();
        let currentLastYY=parseInt(currentYear.substr(-2));
        let currentFirstYY=parseInt(currentYear.substr(0,2));
        let diff=year-currentLastYY;
        let fullyear=currentFirstYY.toString()+year.toString();
        if (diff >=51 && diff <= 99) {
            fullyear=(currentFirstYY-1).toString()+year.toString();
        }
        if (diff >= -99 && diff <= -50) {
            fullyear=(currentFirstYY+1).toString()+year.toString();
        }
        if (fullyear !== undefined) {
            rv = fullyear + '-' + doubleDigits[3] + '-' + doubleDigits[5];
        }
    }
    return rv;
}

export default {
    interpretScan
}
