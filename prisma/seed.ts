import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getNotes().map((note) => {
      return db.note.create({ data: note });
    })
  );
}

seed();

function getNotes() {
  return [
    {
      title: "Margin collapse in CSS",
      content:
        "Margins can collapse vertically (in same direction as well), but not horizontally. This rule only applies to Flow layout and not other layouts.",
    },
    {
      title: "Stacking context in CSS",
      content:
        "There are multiple ways to create a new stacking context, one of them is by using `position: relative` or `position: absolute` with z-index specified. Another option is to use `isolation: isolate` property",
    },
    {
      title: "Fixed position failure",
      content:
        "Fixed position fails to behave the way it should when any of its ancestor have a `transform` or `will-change` property set",
    },
    {
      title: "This is a long title to cover the long title scenario",
      content: "Some good content",
    },
  ];
}
