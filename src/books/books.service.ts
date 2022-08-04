import { Injectable } from '@nestjs/common';
import { BookInterface } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  private readonly books: BookInterface[] = [];

  create(book: BookInterface) {
    this.books.push(book);
  }

  findAll(): BookInterface[] {
    return this.books;
  }

  findByID(id: number) {
    if (typeof this.books[id] !== 'undefined') {
      return this.books[id];
    }

    return null;
  }
}
