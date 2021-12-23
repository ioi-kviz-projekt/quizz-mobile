interface Type {
    prototype: BaseError;
}

export class BaseError extends Error {
    
    protected _type: Type;
    
    constructor(message: string, type: Type) {
        super(message);
        this._type = type;
        Object.setPrototypeOf(this, type.prototype);
    }
    
    public get type(): Type {
        return this._type;
    }
    
}

export class InternalServerError extends BaseError {
    constructor(message: string) {
        super(message, InternalServerError);
    }
}

export class BadRequestError extends BaseError {
    constructor(message: string) {
        super(message, BadRequestError);
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message, NotFoundError);
    }
}

export class UnknownError extends BaseError {
    
    private readonly _cause: Error;
    
    constructor(message: string, cause?: Error) {
        super(message, UnknownError);
        if (cause) {
            this._cause = cause;
        }
    }
    
    public static fromCause(cause: Error): UnknownError {
        return new UnknownError(cause.message, cause);
    }
    
    public get cause(): Error {
        return this._cause;
    }
}

export class ValidationError extends BaseError {
    constructor(message: string) {
        super(message, ValidationError);
    }
}
