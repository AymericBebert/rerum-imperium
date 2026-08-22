export class HttpError extends Error {
    public code: number;
    public customDetails: string;

    constructor(code: number, message: string, customDetails = '') {
        super(message);
        this.code = code;
        this.customDetails = customDetails;
    }
}
