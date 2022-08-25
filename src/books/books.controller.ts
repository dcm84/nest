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

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() creatingBook: BookCreateDto) {
    this.booksService.create(creatingBook);
  }

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.booksService.getBooks();
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    return this.booksService.getBook(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() data: BookCreateDto,
  ): Promise<Book> {
    return this.booksService.updateBook(id, data);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.booksService.deleteBook(id);
  }
}
