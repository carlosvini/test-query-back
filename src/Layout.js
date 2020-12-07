import { useHistory } from "react-router-dom";

export default function Layout({ children }) {
  const history = useHistory();
  return (
    <div>
      <header>
        Header
        <button onClick={() => history.goBack()}>Back</button>
      </header>
      {children}
    </div>
  );
}
