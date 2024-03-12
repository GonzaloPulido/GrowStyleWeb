declare module "*.svg" {
    const content: string;
    export default content
}

declare module "*.png" {
    const content: {src:string};
    export default content
}

declare module "*.webp" {
    const content: string;
    export default content
}

declare module "*.mp4" {
    const content: string;
    export default content
}