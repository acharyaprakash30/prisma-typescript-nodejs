import { db } from "../utils/db.server";
import type { Author } from "../author/author.service";

type BookRead = {
  id: number;
  title: string;
  datePublished: Date;
  isFriction: boolean;
  author: Author;
  //   authorId: number;
};

type BookWrite = {
  title: string;
  datePublished: Date;
  authorId: number;
  isFriction: boolean;
};

export const listBooks = async (): Promise<BookRead[]> => {
  return db.book.findMany({
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFriction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      //   authorId: true,
    },
  });
};

export const getBook = async (id: number): Promise<BookRead | null> => {
  return db.book.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      isFriction: true,
      datePublished: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const createBook = async (book: BookWrite): Promise<BookRead> => {
  const { title, authorId, datePublished, isFriction } = book;
  const parsedDate: Date = new Date(datePublished);

  return db.book.create({
    data: {
      title,
      authorId,
      isFriction,
      datePublished: parsedDate,
    },
    select: {
      id: true,
      title: true,
      isFriction: true,
      datePublished: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const updateBook = async (
  book: BookWrite,
  id: number
): Promise<BookRead> => {
  const { title, isFriction, datePublished, authorId } = book;
  return db.book.update({
    where: {
      id,
    },
    data: {
      title,
      isFriction,
      datePublished,
      authorId,
    },
    select: {
      id: true,
      title: true,
      isFriction: true,
      datePublished: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const deleteBook = async (id: number): Promise<void> => {
  await db.book.delete({
    where: {
      id,
    },
  });
};