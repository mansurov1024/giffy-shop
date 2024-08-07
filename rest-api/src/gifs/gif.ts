export interface Gif {
    id: string;
    url: string;
    title: string;
    images: {
        original: {
          url: string;
        },
    },
}