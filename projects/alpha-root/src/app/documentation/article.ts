export interface IArticle {
    adminOnly: boolean,
    artBody: string,
    artCaption: string,
    artCreatedDate: Date,
    publishedDate: Date | null,
    artImgLink: string,
    artModifiedDate: Date,
    catID: number,
    id?: number,
    artID: number,
    loginRequired: boolean,
}
