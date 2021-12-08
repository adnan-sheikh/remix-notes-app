import { Form, json, redirect, useActionData, useCatch } from "remix";
import type { LinksFunction, ActionFunction } from "remix";
import notesIndexStylesUrl from "~/styles/notes/new.css";
import { db } from "~/utils/db.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: notesIndexStylesUrl }];
};

function validateTitle(title: string) {
  if (title.length < 5) {
    return "That title is too short (should be more than 5 chars)";
  }
}

function validateContent(content: string) {
  if (content.length < 10) {
    return "That note is too short!";
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    title: string;
    content: string;
  };
  fields?: {
    title: string;
    content: string;
  };
};

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || typeof content !== "string") {
    return json({ formError: "Form data is invalid" }, { status: 422 });
  }

  const fieldErrors = {
    title: validateTitle(title),
    content: validateContent(content),
  };

  const fields = { title, content };

  if (Object.values(fieldErrors).some(Boolean)) {
    return json({ fieldErrors, fields }, { status: 400 });
  }

  const newNote = await db.note.create({ data: fields });
  return redirect(`/notes/${newNote.id}`);
};

export default function Note() {
  const actionData = useActionData<ActionData>();

  return (
    <Form method="post">
      Add a new note
      <div className="inputContainer">
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={actionData?.fields?.title}
        />
        {actionData?.fieldErrors?.title ? (
          <p className="validationError" role="alert">
            {actionData?.fieldErrors?.title}
          </p>
        ) : null}
      </div>
      <div className="inputContainer">
        <label htmlFor="content">Content: </label>
        <textarea
          id="content"
          name="content"
          defaultValue={actionData?.fields?.content}
        />
        {actionData?.fieldErrors?.content ? (
          <p className="validationError" role="alert">
            {actionData?.fieldErrors?.content}
          </p>
        ) : null}
      </div>
      <button type="submit">Submit</button>
    </Form>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  switch (caught.status) {
    case 422:
      return <p>Form data is invalid</p>;
    case 404:
      return (
        <div>
          <pre>{JSON.stringify(caught, null, 2)}</pre>
        </div>
      );
    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      );
  }
}
