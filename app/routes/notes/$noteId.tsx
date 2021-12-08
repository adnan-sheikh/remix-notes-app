import { Note } from ".prisma/client";
import { Link, useCatch, useLoaderData } from "remix";
import type { LoaderFunction, LinksFunction } from "remix";
import { db } from "~/utils/db.server";
import noteIdStylesUrl from "~/styles/notes/$noteId.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: noteIdStylesUrl,
    },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  const note: Note | null = await db.note.findUnique({
    where: { id: params.noteId },
  });
  if (!note) {
    throw new Response("Note not found", { status: 404 });
  }
  return note;
};

export default function Note() {
  const note = useLoaderData<Note>();
  return (
    <section className="noteContainer">
      <section className="notePreview">
        <h1>{note.title}</h1>
        <p>{note.content}</p>
      </section>
      <button>
        <Link to="edit" prefetch="intent">
          Edit
        </Link>
      </button>
    </section>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  switch (caught.status) {
    case 404:
      return <p>Nice try, but there's no such note found 😏</p>;
  }
}
