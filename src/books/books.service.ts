import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookCreateDto } from './interfaces/book-create.dto';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(creatingBook: BookCreateDto): Promise<Book> {
    const createdBook = await this.bookModel.create(creatingBook);
    return createdBook;
  }

  async getBooks(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async getBook(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async updateBook(id: string, data: BookCreateDto): Promise<Book> {
    const book = await this.bookModel.findById(id);

    if (book == null) return null;

    return this.bookModel.findByIdAndUpdate(id, data);
  }

  async deleteBook(id: string) {
    const deletedCat = await this.bookModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
