export function done(resolve: any, reject: any): Function {
    return function (err: any, data: any) {
        if (err) reject(data);
        else resolve(data);
    };
}
