export interface IGif {
    id: number;
    url: string;
    title: string;
    images: {
        original: {
          url: string;
        },
    },
}