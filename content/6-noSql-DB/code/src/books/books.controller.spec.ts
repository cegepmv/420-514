import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;

  const booksServiceMock = {
    addAuthor: jest.fn(),
    updateAuthorName: jest.fn(),
    updateAuthorWithArrayFilters: jest.fn(),
    removeAuthor: jest.fn(),
    findBookById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: booksServiceMock,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    jest.clearAllMocks();
  });

  it('should call addAuthor', async () => {
    booksServiceMock.addAuthor.mockResolvedValue({ acknowledged: true });

    const result = await controller.addAuthor('book001', {
      author_id: 'author999',
      name: 'New Author',
    });

    expect(booksServiceMock.addAuthor).toHaveBeenCalledWith('book001', {
      author_id: 'author999',
      name: 'New Author',
    });
    expect(result).toEqual({ acknowledged: true });
  });

  it('should call updateAuthorName', async () => {
    booksServiceMock.updateAuthorName.mockResolvedValue({ acknowledged: true });

    const result = await controller.updateAuthorName(
      'book001',
      'author999',
      { name: 'Updated Name' },
    );

    expect(booksServiceMock.updateAuthorName).toHaveBeenCalledWith(
      'book001',
      'author999',
      'Updated Name',
    );
    expect(result).toEqual({ acknowledged: true });
  });

  it('should call removeAuthor', async () => {
    booksServiceMock.removeAuthor.mockResolvedValue({ acknowledged: true });

    const result = await controller.removeAuthor('book001', 'author999');

    expect(booksServiceMock.removeAuthor).toHaveBeenCalledWith(
      'book001',
      'author999',
    );
    expect(result).toEqual({ acknowledged: true });
  });
});
