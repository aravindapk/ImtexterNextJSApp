export type Photo = {
    name : string;
    src : string;
    altText : string;
}

export type Photos = {
    items : Photo [];
    imageCount : number;
    status : string;
}