export interface IBook {
    title: string;
    author: string;
    genre?: string;
    isbn?: number;
    cover?: string;
    notes?: string;
    color?: string;
    language?: string;
    authorGender?: string;
    id?: string;
}

export interface IBookResponse {
    book: IBook;
}

export interface IBookEdited {
    newTitle: string;
    newAuthor: string;
    newGenre: string;
}
