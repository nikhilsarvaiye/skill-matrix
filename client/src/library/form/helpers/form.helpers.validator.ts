export class formValidator {
    /**
     * Uses the private _exclusive field in the schema to get whether or not
     * the field is marked as required or not.
     */
    static isRequiredField = (schema: any) => {
        const fields = schema.fields;
        return Object.keys(fields).reduce((accu: any, field: string) => {
            accu[field] = fields[field]._exclusive.required;
            return accu;
        }, {});
    };
}

export { formValidator as FormValidator };
