import { IGif } from "../gifs/gif.interface";
import { Order } from "./order";

export async function fetchOrders(token: string): Promise<Order[] | null> {
    const response = await fetch(
        `http://localhost:3001/orders/`,
        {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,

            },
        },
    );
    if (response.status === 403) {
        const responseJson = await response.json();
        alert(responseJson.message);
        return null;
    }
    const orders = await response.json();
    return orders;
}

export async function addOrder(token: string, gif: IGif): Promise<Order[] | null> {
    const response = await fetch(
        `http://localhost:3001/orders/`,
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,

            },
            body: JSON.stringify({
                gif,
            })
        },
    );
    if (response.status === 403) {
        const responseJson = await response.json();
        alert(responseJson.message);
        return null;
    }
    const orders = await response.json();
    return orders;
}


