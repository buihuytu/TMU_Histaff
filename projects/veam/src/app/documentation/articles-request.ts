export interface IArticlesRequest {
    catId: number,
    tagId: number | null,
    keyword: string,
    currentPage: number,
    pageSize: number,
}
