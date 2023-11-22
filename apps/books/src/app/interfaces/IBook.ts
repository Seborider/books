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

export interface IBookOpenLibResponse {
    key: string;
    title: string;
    author_name?: string[];
    isbn?: string[];
    cover_i?: number;
    publish_date?: string[];
    publish_year?: number[];
    first_publish_year?: number;
    last_modified_i?: number;
    ebook_count_i?: number;
    has_fulltext?: boolean;
    public_scan_b?: boolean;
    cover_edition_key?: string;
    publisher?: string[];
    author_key?: string[];
    author_alternative_name?: string[];
}
