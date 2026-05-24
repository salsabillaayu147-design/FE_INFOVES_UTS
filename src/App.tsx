import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./pages/RegisterFrom";
import Beranda from "./pages/Beranda";
import Competition from "./pages/competition";
import Seminar from "./pages/Seminar";
import Workshop from "./pages/Workshop";
import Talkshow from "./pages/Talkshow";
import LoginForm from "./pages/LoginFrom";
import MainLayout from "./layout/MainLayout";
import AuthLayouts from "./layout/AuthLayouts";
import DashboardIndex from "./dashboard/DashboardIndex";
import DashboardLayouts from "./layout/DashboardLayouts";
import CategoryIndex from "./dashboard/category/CategoryIndex";
import EventIndex from "./dashboard/event/EventIndex";
import CategoryCreate from "./dashboard/category/CategoryCreate";
import SeminarIndex from "./dashboard/seminar/SeminarIndex";
import SpeakerCreate from "./dashboard/seminar/SpeakerCreate";
import EventCreate from "./dashboard/event/EventCreate";
import EventEdit from "./dashboard/event/EventEdit";
import Biodata from "./dashboard/biodata/biodata";
import CategoryEdit from "./dashboard/category/CategoryEdit";
import SpeakerEdit from "./dashboard/seminar/SpeakerEdit";
import ProtectedRoute from "./assets/routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/talkshow" element={<Talkshow />} />
        </Route>
        <Route element={<AuthLayouts />}>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>
        <Route>
          <Route element={<ProtectedRoute />}>
            <Route  element={<DashboardLayouts />}>
              <Route path="/dashboard" element={<DashboardIndex />} />
              <Route path="/dashboard/category" element={<CategoryIndex />} />
              <Route path="/dashboard/category/create" element={<CategoryCreate />} />
              <Route path="/dashboard/category/edit/:id" element={<CategoryEdit />} />
              <Route path="/dashboard/event" element={<EventIndex />} />
              <Route path="/dashboard/event/new" element={<EventCreate/>}/>
              <Route path="/dashboard/event/edit/:id" element={<EventEdit/>}/>
              <Route path="/dashboard/seminar" element={<SeminarIndex />} />
              <Route path="/dashboard/seminar/speaker" element={<SpeakerCreate/>}/>
              <Route path="/dashboard/seminar/speaker/edit/:id" element={<SpeakerEdit/>}/>
              <Route path="/dashboard/biodata" element={<Biodata />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;