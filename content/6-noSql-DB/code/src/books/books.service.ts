// books.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateAuthorDto } from '../create-author.dto';
import { UpdateAuthorDto } from '../update-author.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async addAuthor(bookId: string, dto: CreateAuthorDto) {
    const result = await this.bookModel.updateOne(
      { _id: bookId },
      { $push: { authors: dto } },
    );

    return result;
  }

  async updateAuthor(bookId: string, authorId: string, dto: UpdateAuthorDto) {
    const result = await this.bookModel.updateOne(
      { _id: bookId, 'authors.author_id': authorId },
      { $set: { 'authors.$.name': dto.name } },
    );

    if (result.matchedCount === 0) {
      throw new NotFoundException('Book or author not found');
    }

    return result;
  }

  async updateAuthorWithArrayFilters(
    bookId: string,
    authorId: string,
    dto: UpdateAuthorDto,
  ) {
    const result = await this.bookModel.updateOne(
      { _id: bookId },
      { $set: { 'authors.$[a].name': dto.name } },
      {
        arrayFilters: [{ 'a.author_id': authorId }],
      },
    );

    return result;
  }

  async removeAuthor(bookId: string, authorId: string) {
    const result = await this.bookModel.updateOne(
      { _id: bookId },
      { $pull: { authors: { author_id: authorId } } },
    );

    return result;
  }

  async findBookById(bookId: string) {
    return this.bookModel.findById(bookId).lean();
  }
}
