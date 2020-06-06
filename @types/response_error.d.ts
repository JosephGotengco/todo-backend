declare module "responseError";

export interface ResponseError extends Error {
    status?: number;
}
