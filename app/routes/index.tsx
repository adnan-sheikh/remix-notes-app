import { Link } from "remix";

export default function Index() {
  return (
    <div className="">
      <p>
        Welcome to the <span className="">Remix Notes App</span>, here you can
        create notes, edit and delete them
      </p>
      <Link to="notes">Read Notes</Link>
    </div>
  );
}
