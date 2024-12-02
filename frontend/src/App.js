import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import './App.css';

// Importing pages
import Root from "./layouts/Root"
import Home from "./pages/Home";
import Dictionary from "./pages/Dictionary/Dictionary";
import Library from "./pages/Library/Library";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Error from "./pages/Error/Error"
import Practice, { loader as practiceLoader, action as practiceAction } from "./pages/Practice/Practice"

// Importing components
import VocabSearch, { loader as searchLoader, action as searchAction} from "./components/VocabSearch/VocabSearch";
import FlashcardSets, { loader as setsLoader } from "./pages/Sets/Sets"
import Vocabulary from "./pages/Library/Vocabulary";
import Characters from "./pages/Library/Characters";
import Sentences from "./pages/Library/Sentences";



// Router for our website!!!! navigational logic happens here
const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to="dictionary/search" replace /> },
      { path: "home", element: <Home />, },
      { path: "dictionary", element: <Dictionary />, 
        children: [
          { index: true, element: <Navigate to="search" replace /> },
          { path: "search", element: <VocabSearch />, loader: searchLoader, action: searchAction },
        ],
      },
      { path: "library", element: <Library />, 
        children: [
          { path: "sets", element: <FlashcardSets />, loader: setsLoader, },
          { path: "vocabulary", element: <Vocabulary />, },
          { path: "characters", element: <Characters />, },
          { path: "sentences", element: <Sentences />, },
        ],
      },
      { path: "settings", element: <Settings />, },
      { path: "stats", element: <Stats />, },
      { path: "practice/:setId", element: <Practice />, loader: practiceLoader, action: practiceAction },
    ],

  },
  { path: "*", element: <Error error={{ status: 404, message: "Page not found" }} />, },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
