import type { LinksFunction } from "remix";
import { Form } from "remix";
import notesIndexStylesUrl from "~/styles/notes/new.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: notesIndexStylesUrl }];
};

export default function Note() {
  return (
    <>
      <Form method="post">
        <div className="inputContainer">
          <label htmlFor="title">Title: </label>
          <input id="title" type="text" name="title" />
        </div>
        <div className="inputContainer">
          <label htmlFor="content">Content: </label>
          <textarea id="content" name="content" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </>
  );
}
