import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import Archive from "./pages/archive";
import AuthorsInstructions from "./pages/authors_instructions";
import CurrentArticles from "./pages/current_articles";
import EditorialGuidelines from "./pages/editorial_guidelines";
import EditorialTeam from "./pages/editorial_team";
import JoinAsReviewer from "./pages/join_as_reviewer";
import JournalInfo from "./pages/journal_info";
import OnlineFirst from "./pages/online_first";
import ReviewerRole from "./pages/reviewer_role";
import ReviewerTeam from "./pages/reviewer_team";
import SubmitManuscript from "./pages/submit_manuscript";
import Contact from "./pages/contact";
import ProtectedRoute from "./components/ProtectedRoute";

//admin page routes
import AdminDashboard from "./pages/admin/AdminDashboard";
import AuthorDashboard from "./pages/author/AuthorDashboard";
import EditorDashboard from "./pages/editor/EditorDashboard";
import ReviewerDashboard from "./pages/reviewer/ReviewerDashboard";
import Users from "./pages/admin/users";
import Pages from "./pages/admin/pages";
import ArticleSubject from "./pages/admin/article-subject";
import ArticleType from "./pages/admin/article-type";
import Issues from "./pages/admin/issues";
import EditProfile from "./pages/admin/editprofile";
import Profile from "./pages/admin/profile";
import AddPage from "./pages/admin/addpage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={ <ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />
        <Route path="/author-dashboard" element={ <ProtectedRoute> <AuthorDashboard /> </ProtectedRoute>} />
        <Route path="/editor-dashboard" element={ <ProtectedRoute> <EditorDashboard /> </ProtectedRoute>} />
        <Route path="/reviewer-dashboard" element={ <ProtectedRoute> <ReviewerDashboard /> </ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/authors_instructions" element={<AuthorsInstructions />} />
        <Route path="/current_articles" element={<CurrentArticles />} />
        <Route path="/editorial_guidelines" element={<EditorialGuidelines />} />
        <Route path="/editorial_team" element={<EditorialTeam />} />
        <Route path="/join_as_reviewer" element={<JoinAsReviewer />} />
        <Route path="/journal_info" element={<JournalInfo />} />
        <Route path="/online_first" element={<OnlineFirst />} />
        <Route path="/reviewer_role" element={<ReviewerRole />} />
        <Route path="/reviewer_team" element={<ReviewerTeam />} />
        <Route path="/submit_manuscript" element={<SubmitManuscript />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/editprofile" element={<ProtectedRoute> <EditProfile /> </ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute> <Users /> </ProtectedRoute>} />
        <Route path="/admin/pages" element={<ProtectedRoute> <Pages /> </ProtectedRoute>} />
        <Route path="/admin/article-subject" element={<ProtectedRoute> <ArticleSubject /> </ProtectedRoute>} />
        <Route path="/admin/article-type" element={<ProtectedRoute> <ArticleType /> </ProtectedRoute>} />
        <Route path="/admin/issues" element={<ProtectedRoute><Issues /> </ProtectedRoute>} />
        <Route path="/admin/addpage" element={<ProtectedRoute> <AddPage /> </ProtectedRoute>} />
        <Route path="/admin/addpage/:id" element={<ProtectedRoute><AddPage /></ProtectedRoute>} />s
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
