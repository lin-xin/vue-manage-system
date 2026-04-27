export interface SelectOption {
    label: string;
    value: string | number | boolean;
}

export interface FormOption {
    list: FormOptionList[];
    labelWidth?: number | string;
    span?: number;
}

export type FormFieldType = 'input' | 'number' | 'select' | 'date' | 'switch' | 'upload';

export interface FormOptionList {
    prop: string;
    label: string;
    type: FormFieldType;
    placeholder?: string;
    disabled?: boolean;
    opts?: SelectOption[];
    format?: string;
    activeValue?: string | number | boolean;
    inactiveValue?: string | number | boolean;
    activeText?: string;
    inactiveText?: string;
    required?: boolean;
}