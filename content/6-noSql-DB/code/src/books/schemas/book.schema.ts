// book.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/*
book document example :
{
    _id: "book001",
    title: "Cell Biology",
    authors: [
      { author_id: "author124", name: "Ellie Smith" },
      { author_id: "author381", name: "John Palmer" }
    ]
  }
*/

@Schema({ _id: false })
export class AuthorEmbedded {
  @Prop({ required: true })
  author_id: string;

  @Prop({ required: true })
  name: string;
}

const AuthorEmbeddedSchema = SchemaFactory.createForClass(AuthorEmbedded);

@Schema({ collection: 'books' })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [AuthorEmbeddedSchema], default: [] })
  authors: AuthorEmbedded[];
}

export type BookDocument = HydratedDocument<Book>;
export const BookSchema = SchemaFactory.createForClass(Book);
