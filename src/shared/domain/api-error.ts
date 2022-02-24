export class ApiError extends Error {
    private code: number;
    constructor(code: number, name: string, message: string) {
        super(message)
        this.name = name;
        this.code = code;
    }
}