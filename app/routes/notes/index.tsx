import type { LinksFunction } from "remix";
import notesIndexStylesUrl from "~/styles/notes/index.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: notesIndexStylesUrl }];
};

export default function NotesIndexRoute() {
  return (
    <div className="notesIndex">
      <p>Please click on some note on the left to view the note content or Create a new note! 😉</p>
    </div>
  );
}
