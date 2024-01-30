import Settings from "../components/Settings/Settings";
import { useAuthContext } from "../context/AuthContext";

const SettingsPage = () => {
  const { user, addUser } = useAuthContext();
  return (
    <>
      <h1>Settings</h1>
      <Settings user={user!} addUser={addUser} />
    </>
  );
};

export default SettingsPage;
