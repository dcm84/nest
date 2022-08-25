import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';

const mockedBook = {
  title: 'Nest Testing guide',
  description: 'Boring book about how to test something',
  authors: 'Best Tester №1',
  favorite: 'not favorite',
  fileCover:
    'https://forum.devtalk.com/uploads/default/optimized/1X/8cd18d48dda968389f2129565bf6427b876008d1_2_853x1024.jpeg',
  fileBook: 'https://somesite.com/download/123123.pdf',
};

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Book>;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockedBook),
            constructor: jest.fn().mockResolvedValue(mockedBook),
            create: jest.fn().mockResolvedValue(mockedBook),
            find: jest.fn(),
            findById: jest.fn().mockResolvedValue(mockedBook),
            findByIdAndUpdate: jest.fn().mockResolvedValue(booksList[1]),
            findByIdAndRemove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken('Book'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert a new book', async () => {
    const newBook = await service.create(mockedBook);
    expect(newBook).toEqual(mockedBook);
  });

  it('should return all books', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(booksList),
    } as any);
    const books = await service.getBooks();
    expect(books).toEqual(booksList);
  });

  it('should return book by id', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockedBook),
    } as any);
    const book = await service.getBook('62ee3a7a0653e5d97035c629');
    expect(book).toEqual(mockedBook);
  });

  it('should update book by id', async () => {
    const book = await service.updateBook(
      '62ee3a7a0653e5d97035c629',
      booksList[1],
    );
    expect(book).toEqual(booksList[1]);
  });

  it('should not update book if there is no book', async () => {
    jest.spyOn(model, 'findById').mockResolvedValue(null);
    const book = await service.updateBook(
      '62ee3a7a0653e5d97035c629',
      booksList[1],
    );
    expect(book).toEqual(null);
  });

  it('should delete book by id', async () => {
    jest.spyOn(model, 'findByIdAndRemove').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockedBook),
    } as any);
    const book = await service.deleteBook('62ee3a7a0653e5d97035c629');
    expect(book).toEqual(mockedBook);
  });
});
