import type { LinksFunction } from "remix";
import { Outlet } from "remix";
import notesStylesUrl from "~/styles/notes.css";

export const notesList = [
  {
    id: "n1",
    title: "Margin collapse in CSS",
    content:
      "Margins can collapse vertically (in same direction as well), but not horizontally. This rule only applies to Flow layout and not other layouts.",
  },
  {
    id: "n2",
    title: "Stacking context in CSS",
    content:
      "There are multiple ways to create a new stacking context, one of them is by using `position: relative` or `position: absolute` with z-index specified. Another option is to use `isolation: isolate` property",
  },
  {
    id: "n3",
    title: "Fixed position failure",
    content:
      "Fixed position fails to behave the way it should when any of its ancestor have a `transform` or `will-change` property set",
  },
];

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: notesStylesUrl }];
};

export default function Notes() {
  return (
    <div className="notesLayout">
      <ul className="sidebarNotes">
        {notesList.map((notes) => (
          <li key={notes.id}>{notes.title}</li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
