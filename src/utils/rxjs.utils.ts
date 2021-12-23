import { catchError, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { AxiosError, AxiosResponse } from "axios";
import { BadRequestError, InternalServerError, NotFoundError, UnknownError, ValidationError } from "../types";

export function mapToType<T>() {
    return function <I>(source: Observable<I>): Observable<T> {
        return source.pipe(
            map(val => val as unknown as T),
        );
    };
}

export function mapToVoid() {
    return function <T>(source: Observable<T>): Observable<void> {
        return source.pipe(
            map(() => undefined),
        );
    };
}

export function getBody<T>() {
    return function(source: Observable<AxiosResponse<T>>): Observable<T> {
        return source.pipe(
            map((res: AxiosResponse<T>) => {
                return res.data;
            }),
        );
    };
}

export function catchAxiosError<T>() {
    return function(source: Observable<T>): Observable<T> {
        return source.pipe(
            catchError(axiosErrorMapper),
        );
    };
}

export function axiosErrorMapper(err: AxiosError): Observable<never> {
    if (hasStatus(err, 404)) {
        return throwError(new NotFoundError("Not found!"));
    }
    if (hasStatus(err, 422)) {
        return throwError(new ValidationError("Validation failed! " + err.message));
    }
    if (hasStatus(err, 500)) {
        return throwError(new InternalServerError("Internal server error! " + err.message));
    }
    if (hasStatus(err, 400)) {
        return throwError(new BadRequestError("Bad request!"));
    }
    return throwError(UnknownError.fromCause(err));
}

export function hasStatus(err: AxiosError, status: number): boolean {
    if (err && err.response) {
        return err.response.status === status;
    }
    return false;
}
