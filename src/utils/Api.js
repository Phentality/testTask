import { date } from '../utils/Date';
import MD5 from "crypto-js/md5";
export const BASE_URL = 'https://api.valantis.store:41000/';

const hash = MD5(`Valantis_${date}`);

const chechRes = (res) => {
    if (res.ok) {
        return res.json();
    }
    return console.log(`Код ошибки: ${res.status}`);
}

export const getAllCards = (action, params) => {
    return fetch(`${BASE_URL}`, {
        method: 'POST',
        withCredentials: true,
        headers: {
            "X-Auth": `${hash}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action, params })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            if (res.status === 500 || 401 || 400) {
                console.log(`Код ошибки: ${res.status}`)
                getAllCards(action, params);
            }
        })
};