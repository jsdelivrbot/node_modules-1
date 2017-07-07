import { localeInfo } from '../cldr';
import { CURRENCY, ACCOUNTING, DECIMAL, PERCENT, SCIENTIFIC, DEFAULT_LOCALE, NUMBER_PLACEHOLDER, EMPTY } from '../common/constants';
import isString from '../common/is-string';
import standardNumberFormat from './standard-number-format';
import customNumberFormat from './custom-number-format';

var standardFormatRegExp = /^(n|c|p|e|a)(\d*)$/i;

function standardFormatOptions(format) {
    var formatAndPrecision = standardFormatRegExp.exec(format);

    if (formatAndPrecision) {
        var options = {
            style: DECIMAL
        };

        var style = formatAndPrecision[1].toLowerCase();

        if (style === "c") {
            options.style = CURRENCY;
        } else if (style === "a") {
            options.style = ACCOUNTING;
        } else if (style === "p") {
            options.style = PERCENT;
        } else if (style === "e") {
            options.style = SCIENTIFIC;
        }

        if (formatAndPrecision[2]) {
            options.minimumFractionDigits = options.maximumFractionDigits = parseInt(formatAndPrecision[2], 10);
        }

        return options;
    }
}

function getFormatOptions(format) {
    var formatOptions;
    if (isString(format)) {
        formatOptions = standardFormatOptions(format);
    } else {
        formatOptions = format;
    }

    return formatOptions;
}

export default function formatNumber(number, format, locale) {
    if ( format === void 0 ) format = NUMBER_PLACEHOLDER;
    if ( locale === void 0 ) locale = DEFAULT_LOCALE;

    if (number === undefined || number === null) {
        return EMPTY;
    }

    if (!isFinite(number)) {
        return number;
    }

    var info = localeInfo(locale);
    var formatOptions = getFormatOptions(format);

    var result;
    if (formatOptions) {
        var style = (formatOptions || {}).style || DECIMAL;
        result = standardNumberFormat(number, Object.assign({}, info.numbers[style], formatOptions), info);
    } else {
        result = customNumberFormat(number, format, info);
    }

    return result;
}

//# sourceMappingURL=format-number.js.map
