import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';

describe('BooksService', () => {
  let service: BooksService;

  const bookModelMock = {
    updateOne: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: bookModelMock,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    jest.clearAllMocks();
  });

  it('should add an author with $push', async () => {
    bookModelMock.updateOne.mockResolvedValue({
      acknowledged: true,
      modifiedCount: 1,
    });

    const result = await service.addAuthor('book001', {
      author_id: 'author999',
      name: 'New Author',
    });

    expect(bookModelMock.updateOne).toHaveBeenCalledWith(
      { _id: 'book001' },
      {
        $push: {
          authors: {
            author_id: 'author999',
            name: 'New Author',
          },
        },
      },
    );

    expect(result).toEqual({
      acknowledged: true,
      modifiedCount: 1,
    });
  });

  it('should update an author name with $set and positional operator', async () => {
    bookModelMock.updateOne.mockResolvedValue({
      acknowledged: true,
      matchedCount: 1,
      modifiedCount: 1,
    });

    const result = await service.updateAuthorName(
      'book001',
      'author999',
      'Updated Name',
    );

    expect(bookModelMock.updateOne).toHaveBeenCalledWith(
      { _id: 'book001', 'authors.author_id': 'author999' },
      {
        $set: {
          'authors.$.name': 'Updated Name',
        },
      },
    );

    expect(result).toEqual({
      acknowledged: true,
      matchedCount: 1,
      modifiedCount: 1,
    });
  });

  it('should update an author name with arrayFilters', async () => {
    bookModelMock.updateOne.mockResolvedValue({
      acknowledged: true,
      matchedCount: 1,
      modifiedCount: 1,
    });

    const result = await service.updateAuthorWithArrayFilters(
      'book001',
      'author999',
      'Updated Name',
    );

    expect(bookModelMock.updateOne).toHaveBeenCalledWith(
      { _id: 'book001' },
      {
        $set: {
          'authors.$[a].name': 'Updated Name',
        },
      },
      {
        arrayFilters: [{ 'a.author_id': 'author999' }],
      },
    );

    expect(result).toEqual({
      acknowledged: true,
      matchedCount: 1,
      modifiedCount: 1,
    });
  });

  it('should remove an author with $pull', async () => {
    bookModelMock.updateOne.mockResolvedValue({
      acknowledged: true,
      modifiedCount: 1,
    });

    const result = await service.removeAuthor('book001', 'author999');

    expect(bookModelMock.updateOne).toHaveBeenCalledWith(
      { _id: 'book001' },
      {
        $pull: {
          authors: {
            author_id: 'author999',
          },
        },
      },
    );

    expect(result).toEqual({
      acknowledged: true,
      modifiedCount: 1,
    });
  });

  it('should throw if book or author is not found', async () => {
    bookModelMock.updateOne.mockResolvedValue({
      acknowledged: true,
      matchedCount: 0,
      modifiedCount: 0,
    });

    await expect(
      service.updateAuthorName('book001', 'missing-author', 'New Name'),
    ).rejects.toThrow('Book or author not found');
  });

  it('should return a book by id', async () => {
    const book = {
      _id: 'book001',
      title: 'Cell Biology',
      authors: [],
    };

    bookModelMock.findById.mockReturnValue({
      lean: jest.fn().mockResolvedValue(book),
    });

    const result = await service.findBookById('book001');

    expect(bookModelMock.findById).toHaveBeenCalledWith('book001');
    expect(result).toEqual(book);
  });
});
