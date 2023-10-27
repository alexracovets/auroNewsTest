import { Route, Routes } from "react-router-dom";

import { Layout } from "./layout/default";

import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Info from "./pages/Memorial";
import Museum from "./pages/Museum";
import Contacts from "./pages/Contacts";
import Admin from "./pages/Admin";
import Page404 from "./pages/404";

export default function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="memorial" element={<Info />} />
          <Route path="museum" element={<Museum />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  )
}
