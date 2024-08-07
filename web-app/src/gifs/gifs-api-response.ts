import { IGif } from "./gif.interface";

export interface GifsApiResponse {
    data: IGif[];
    meta: {
        status: number;
        msg: string;
        response_id: string;
    }
    pagination: {
        total_count: number;
        count: number;
        offset: number;
    }
}