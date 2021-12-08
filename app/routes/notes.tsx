import type { LinksFunction } from "remix";
import { Outlet, Link } from "remix";
import notesStylesUrl from "~/styles/notes.css";

export const notesList = [
  {
    id: "n1",
    title: "Margin collapse in CSS",
    content:
      "Margins can collapse vertically (in same direction as well), but not horizontally. This rule only applies to Flow layout and not other layouts.",
    date: new Date(),
  },
  {
    id: "n2",
    title: "Stacking context in CSS",
    content:
      "There are multiple ways to create a new stacking context, one of them is by using `position: relative` or `position: absolute` with z-index specified. Another option is to use `isolation: isolate` property",
    date: new Date(),
  },
  {
    id: "n3",
    title: "Fixed position failure",
    content:
      "Fixed position fails to behave the way it should when any of its ancestor have a `transform` or `will-change` property set",
    date: new Date(),
  },
  {
    id: "n4",
    title: "This is a long title to cover the long title scenario",
    content: "Some good content",
    date: new Date(),
  },
];

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: notesStylesUrl }];
};

export default function Notes() {
  return (
    <div className="notesLayout">
      <ul className="sidebarNotes">
        <Link to="new">
          <button className="newButton">Create new note</button>
        </Link>
        {notesList.map((notes) => (
          <Link to={notes.id} key={notes.id}>
            <div className="noteCard">
              <li className="note">{notes.title}</li>
              <p className="date">{notes.date?.toDateString()}</p>
            </div>
          </Link>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
