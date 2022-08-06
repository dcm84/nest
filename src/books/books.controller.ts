import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookCreateDto } from './interfaces/book-create.dto';
import { Book } from './schemas/book.schema';
import { ParseMongoIDPipe } from 'src/common/pipes/parse-mongoid.pipe';
@Controller('api/books')
export class BooksController {
  constructor(private readonly BooksService: BooksService) {}

  @Post()
  async create(@Body() creatingBook: BookCreateDto) {
    this.BooksService.create(creatingBook);
  }

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.BooksService.getBooks();
  }

  @Get(':id')
  async getBook(
    @Param('id', new ParseMongoIDPipe()) id: string,
  ): Promise<Book> {
    return this.BooksService.getBook(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id', new ParseMongoIDPipe()) id: string,
    @Body() data: BookCreateDto,
  ): Promise<Book> {
    return this.BooksService.updateBook(id, data);
  }

  @Delete(':id')
  async deleteBook(
    @Param('id', new ParseMongoIDPipe()) id: string,
  ): Promise<Book> {
    return this.BooksService.deleteBook(id);
  }
}
