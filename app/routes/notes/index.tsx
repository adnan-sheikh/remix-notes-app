import type { LinksFunction } from "remix";
import { Outlet } from "remix";
import notesIndexStylesUrl from "~/styles/notes/index.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: notesIndexStylesUrl }];
};

export default function NotesIndexRoute() {
  return <div className="notesIndex">This is the index route of notes</div>;
}
