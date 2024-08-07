import { IGif } from "../gifs/gif.interface";

export interface Order {
    id: string;
    status: string;
    gif: IGif;
}