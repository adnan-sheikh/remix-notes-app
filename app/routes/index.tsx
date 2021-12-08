import type { LinksFunction } from "remix";
import { Link } from "remix";
import indexStylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: indexStylesUrl }];
};

export default function Index() {
  return (
    <div className="indexContainer">
      <p>Welcome to the</p>
      <p className="title">Remix Notes App</p>
      <p>Here you can create notes, edit and delete them</p>
      <Link to="notes" className="link">
        Read Notes
      </Link>
    </div>
  );
}
