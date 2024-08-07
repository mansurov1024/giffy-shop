import { Gif } from "./gif";

export interface GifsApiResponse {
    data: Gif[];
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