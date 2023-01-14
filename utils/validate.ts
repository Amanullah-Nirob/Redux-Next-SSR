

export const validate = (min: number, max: number,) => {
    return {
        required: { value: true, message: "Field required" },
        minLength: { value: min, message: `Minimum ${min} characters required` },
        maxLength: { value: max, message: `Maximum length is ${max} characters` }
    }
}