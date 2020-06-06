import { User } from "./user";

declare module "todoApiResponse";

export interface TodoApiResponse {
    status: boolean;
    msg: string;
    code: httpStatusCode;
    devMsg?: string;
    user?: User;
    errStack?: any;
}
