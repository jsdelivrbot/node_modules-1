import { localeInfo, localeCurrency, currencyDisplays } from '../cldr';
import { PERCENT, NUMBER_PLACEHOLDER, CURRENCY_PLACEHOLDER, DEFAULT_LOCALE, EMPTY, POINT } from '../common/constants';
import isNumber from '../common/is-number';
import isCurrencyStyle from './is-currency-style';

var exponentRegExp = /[eE][\-+]?[0-9]+/;
var nonBreakingSpaceRegExp = /\u00A0/g;

function cleanCurrencyNumber(value, info, format) {
    var isCurrency = isCurrencyStyle(format.style);
    var number = value;
    var negative;

    var currency = format.currency || localeCurrency(info, isCurrency);

    if (currency) {
        var displays = currencyDisplays(info, currency, isCurrency);
        if (displays) {
            for (var idx = 0; idx < displays.length; idx++) {
                var display = displays[idx];
                if (number.includes(display)) {
                    number = number.replace(display, EMPTY);
                    isCurrency = true;
                    break;
                }
            }
        }

        if (isCurrency) {
            var patterns = info.numbers.currency.patterns;
            if (patterns.length > 1) {
                var parts = (patterns[1] || EMPTY).replace(CURRENCY_PLACEHOLDER, EMPTY).split(NUMBER_PLACEHOLDER);
                if (number.indexOf(parts[0]) > -1 && number.indexOf(parts[1]) > -1) {
                    number = number.replace(parts[0], EMPTY).replace(parts[1], EMPTY);
                    negative = true;
                }
            }
        }
    }

    return {
        number: number,
        negative: negative
    };
}

export default function parseNumber(value, locale, format) {
    if ( locale === void 0 ) locale = DEFAULT_LOCALE;
    if ( format === void 0 ) format = {};

    if (!value && value !== 0) {
        return null;
    }

    if (isNumber(value)) {
        return value;
    }

    var info = localeInfo(locale);
    var symbols = info.numbers.symbols;

    var number = value.toString();
    var isPercent;

    if (exponentRegExp.test(number)) {
        number = parseFloat(number.replace(symbols.decimal, POINT));
        return isNaN(number) ? null : number;
    }

    var negativeSignIndex = number.indexOf("-");
    if (negativeSignIndex > 0) {
        return null;
    }

    var isNegative = negativeSignIndex > -1;
    var ref = cleanCurrencyNumber(number, info, format);
    var negativeCurrency = ref.negative;
    var newNumber = ref.number;

    number = newNumber;
    isNegative = negativeCurrency !== undefined ? negativeCurrency : isNegative;

    if (format.style === PERCENT || number.indexOf(symbols.percentSign) > -1) {
        number = number.replace(symbols.percentSign, EMPTY);
        isPercent = true;
    }

    number = number.replace("-", EMPTY)
          .replace(nonBreakingSpaceRegExp, " ")
          .split(symbols.group.replace(nonBreakingSpaceRegExp, " ")).join(EMPTY)
          .replace(symbols.decimal, POINT);

    number = parseFloat(number);

    if (isNaN(number)) {
        number = null;
    } else if (isNegative) {
        number *= -1;
    }

    if (number && isPercent) {
        number /= 100;
    }

    return number;
}

//# sourceMappingURL=parse-number.js.map
