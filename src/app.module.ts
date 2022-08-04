import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';

const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'password';
const NameDB = process.env.DB_NAME || 'library';
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/';

@Module({
  imports: [
    MongooseModule.forRoot(HostDb, {
      user: UserDB,
      pass: PasswordDB,
      dbName: NameDB,
    }),
    BooksModule,
  ],
})
export class AppModule {}
