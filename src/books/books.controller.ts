import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { BooksService } from './books.service';
import { BookCreateDto } from './interfaces/book-create.dto';
import { BookInterface } from './interfaces/book.interface';

@Controller('api/books')
export class BooksController {
  constructor(private readonly BooksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: BookCreateDto) {
    console.log(createBookDto);
    this.BooksService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<BookInterface[]> {
    return this.BooksService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    return this.BooksService.findByID(id);
  }
}
