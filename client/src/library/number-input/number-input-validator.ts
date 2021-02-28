export enum NumberFormatType {
    Number = 'number',
    Decimal = 'decimal',
}

export interface INumberValidator {
    regex: RegExp;
    placeholder: string;
    options: any;
    parseNumber: (value: any) => any;
    formatNumber: (value: any, formatter: any) => any;
}

class NumberValidator implements INumberValidator {
    regex = /[^0-9]/g;
    placeholder = 'Enter number';
    options = {
        style: 'integer',
    };
    parseNumber = (value: any) => {
        value = value.toString();
        value = value.replace(this.regex, '');
        return value ? parseFloat(value) : '';
    };
    formatNumber = (value: any, formatter: any) => {
        return formatter(value, this.options);
    };
}

class DecimalValidator implements INumberValidator {
    regex = /[^0-9.]/g;
    placeholder = '0.00';
    options = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    parseNumber = (value: any) => {
        value = value.toString();
        value = value.replace(this.regex, '');
        return value && value.indexOf('.') == -1 ? parseFloat(value) : value;
    };
    formatNumber = (value: any, formatter: any) => {
        return formatter(value, this.options);
    };
}

export class NumberInputValidator {
    validator: INumberValidator;
    constructor(formatType: NumberFormatType) {
        switch (formatType) {
            case NumberFormatType.Number:
                this.validator = new NumberValidator();
                break;
            case NumberFormatType.Decimal:
                this.validator = new DecimalValidator();
                break;
            default:
                this.validator = new NumberValidator();
        }
    }

    get placeholder() {
        return this.validator.placeholder;
    }

    parseNumber = (value: any) => {
        return this.validator.parseNumber(value);
    };

    formatNumber = (value: any, formatter: any) => {
        return this.validator.formatNumber(value, formatter);
    };
}
