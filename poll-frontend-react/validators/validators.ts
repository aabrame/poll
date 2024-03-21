
export type ValidatorFn = (value: string) => { [key: string]: any } | undefined;

export namespace Validators {

    export const required: ValidatorFn = (value: string) => {
        return value?.length === 0 ? { required: "the field is required" } : undefined;
    }

    export const forbiddenValue: (fv: string) => ValidatorFn = (fv: string) => {
        return (value: string) => value.toLowerCase().includes(fv.toLowerCase()) ? { forbiddenValue: `the value ${fv} is forbidden` } : undefined;
    }
}