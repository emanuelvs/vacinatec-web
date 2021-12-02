import { Base64 } from 'js-base64';


export function jwtPayload(token) {
    let payload = token.split('.')[1];
    try {
        return JSON.parse(Base64.decode(payload));
    } catch (err) {
        return '';
    }
}