import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async linkAuthorAndBook(
    bookId: string,
    bookTitle: string,
    authorId: string,
    authorName: string,
  ) {
    const session = await this.connection.startSession();

    try {
      await session.withTransaction(async () => {
        await this.connection.collection('books').updateOne(
          { _id: new Types.ObjectId(bookId) },
          {
            $push: {
              authors: {
                author_id: authorId,
                name: authorName,
              },
            },
          },
          { session },
        );

        await this.connection.collection('authors').updateOne(
          { _id: new Types.ObjectId(authorId) },
          {
            $push: {
              books: {
                book_id: bookId,
                title: bookTitle,
              },
            },
          },
          { session },
        );
      });
    } finally {
      await session.endSession();
    }
  }
}
