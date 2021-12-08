import { Note } from ".prisma/client";
import type { LinksFunction } from "remix";
import { Outlet, Link, LoaderFunction, useLoaderData } from "remix";
import notesStylesUrl from "~/styles/notes.css";
import { db } from "~/utils/db.server";

type LoaderData = Array<Pick<Note, "id" | "title" | "updatedAt">>;

export const loader: LoaderFunction = async () => {
  const notes: LoaderData = await db.note.findMany({
    orderBy: { updatedAt: "desc" },
  });
  const dateFormattedNotes = notes.map((note) => ({
    ...note,
    updatedAt: note.updatedAt.toLocaleDateString("en-IN"),
  }));
  return dateFormattedNotes;
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: notesStylesUrl }];
};

export default function Notes() {
  const notes = useLoaderData<LoaderData>();
  return (
    <div className="notesLayout">
      <ul className="sidebarNotes">
        <Link to="new">
          <button className="newButton">Create new note</button>
        </Link>
        {notes.map((note) => (
          <Link to={note.id} key={note.id}>
            <div className="noteCard">
              <li className="note">{note.title}</li>
              <p className="date">{note.updatedAt}</p>
            </div>
          </Link>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <div>{error.name}</div>
      <div>{error.message}</div>
    </>
  );
}
