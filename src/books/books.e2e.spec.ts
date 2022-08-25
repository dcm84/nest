import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

const mockedBook = {
  title: 'Nest Testing guide',
  description: 'Boring book about how to test something',
  authors: 'Best Tester №1',
  favorite: 'not favorite',
  fileCover:
    'https://forum.devtalk.com/uploads/default/optimized/1X/8cd18d48dda968389f2129565bf6427b876008d1_2_853x1024.jpeg',
  fileBook: 'https://somesite.com/download/123123.pdf',
};

const booksList = [
  mockedBook,
  {
    title: 'How avoid testing guide',
    description: 'Better book about how to avoid testing',
    authors: 'Newbee Tester',
    favorite: 'favorite',
    fileCover:
      'https://forum.devtalk.com/uploads/default/optimized/1X/8cd18d48dda968389f2129565bf6427b876008d1_2_853x1024.jpeg',
    fileBook: 'https://somesite.com/download/123123.pdf',
  },
];

describe('Books controller (e2e)', () => {
  let app: INestApplication;
  const booksService = {
    new: jest.fn().mockResolvedValue(mockedBook),
    constructor: jest.fn().mockResolvedValue(mockedBook),
    create: jest.fn().mockResolvedValue(mockedBook),
    getBooks: jest.fn().mockResolvedValue(booksList),
    getBook: jest.fn().mockResolvedValue(mockedBook),
    updateBook: jest.fn().mockResolvedValue(booksList[1]),
    deleteBook: jest.fn().mockResolvedValue(mockedBook),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET Books', () => {
    return request(app.getHttpServer())
      .get('/api/books')
      .expect(200)
      .expect(booksList);
  });

  it('/GET Book', () => {
    return request(app.getHttpServer())
      .get('/api/books/62ee3a7a0653e5d97035c629')
      .expect(200)
      .expect(mockedBook);
  });

  it('/POST Book', () => {
    return request(app.getHttpServer())
      .post('/api/books')
      .send(mockedBook)
      .expect(201)
      .expect({});
  });

  it('/PUT Book', () => {
    return request(app.getHttpServer())
      .put('/api/books/62ee3a7a0653e5d97035c629')
      .send(booksList[1])
      .expect(200)
      .expect(booksList[1]);
  });

  it('/DELETE Book', () => {
    return request(app.getHttpServer())
      .delete('/api/books/62ee3a7a0653e5d97035c629')
      .expect(200)
      .expect(mockedBook);
  });
});
