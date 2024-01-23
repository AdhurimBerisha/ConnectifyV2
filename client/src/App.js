import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Home,
  Login,
  Profile,
  Register,
  ResetPassword,
  AdminR,
  AdminL,
  Panel,
} from "./pages";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Events from "./pages/Events";
import Comments from "./pages/Comments";
import Likes from "./pages/Likes";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

function App() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div data-theme={theme} className="w-full min-h-[100vh]">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id?" element={<Profile />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/adminr" element={<AdminR />} />
        <Route path="/adminl" element={<AdminL />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/users" element={<Users />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;
