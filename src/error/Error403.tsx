import { Link } from "react-router-dom";

function Error403() {
  return (
    <div>
      <h1>403</h1>
      <h3>Sorry, you are not authorized to access this page</h3>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Error403;