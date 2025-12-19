export interface Irequest  {
    authorization?: boolean,
    method: string,
    route: string,
    params?: object,
    customHeaders?: object
}