export class ApiResponse<D> {
    data: D | D[];
    statusCode: number;
    message: string;

    constructor(data: D | D[], statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;

        return this;
    }
}
