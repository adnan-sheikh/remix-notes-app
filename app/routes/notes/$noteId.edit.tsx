import {
  ActionFunction,
  Form,
  json,
  LinksFunction,
  redirect,
  useActionData,
  useCatch,
  useLoaderData,
} from "remix";
import type { LoaderFunction } from "remix";
import { db } from "~/utils/db.server";
import { Note } from ".prisma/client";
import editNoteStylesUrl from "~/styles/notes/$noteId.edit.css";
import { ActionData, validateContent, validateTitle } from "./new";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: editNoteStylesUrl,
    },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  const note = await db.note.findUnique({ where: { id: params.noteId } });
  if (!note) {
    throw new Response("Note not found", { status: 404 });
  }
  return note;
};

export const action: ActionFunction = async ({
  params,
  request,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const method = formData.get("_method");

  if (method === "delete") {
    console.log("delete method on");
    await db.note.delete({ where: { id: params.noteId } });
    return redirect(`/notes/`);
  }

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

  const updatedNote = await db.note.update({
    where: { id: params.noteId },
    data: { ...fields },
  });

  return redirect(`/notes/${updatedNote.id}`);
};

export default function EditNote() {
  const note = useLoaderData<Note>();
  const actionData = useActionData<ActionData>();

  return (
    <>
      <Form method="post">
        <div className="inputContainer">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={note.title}
          />
          {actionData?.fieldErrors?.title ? (
            <p className="validationError" role="alert">
              {actionData?.fieldErrors?.title}
            </p>
          ) : null}
        </div>
        <div className="inputContainer">
          <label htmlFor="content">Content: </label>
          <textarea id="content" name="content" defaultValue={note.content} />
          {actionData?.fieldErrors?.content ? (
            <p className="validationError" role="alert">
              {actionData?.fieldErrors?.content}
            </p>
          ) : null}
        </div>
        <button type="submit">Update</button>
      </Form>
      <Form method="post">
        <input type="hidden" name="_method" value="delete" />
        <button type="submit" className="deleteBtn">
          Delete Note
        </button>
      </Form>
    </>
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
