import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { PostList } from "./pages/PostList";
import { PostEditor } from "./pages/PostEditor";
import { Authors } from "./pages/Authors";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostEditor />} />
        <Route path="/authors" element={<Authors />} />
      </Route>
      <Route path="*" element={<Navigate to="/posts" replace />} />
    </Routes>
  );
}
