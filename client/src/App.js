import UserContext from "./component/AccountContext.jsx";
import Views from "./views.js";

function App() {
  return (
    <UserContext>
      <Views />
    </UserContext>
  );
}

export default App;
