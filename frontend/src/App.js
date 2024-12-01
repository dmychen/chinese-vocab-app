import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';

import Home from "./pages/Home";
import Dictionary from "./pages/Dictionary";
import Library from "./pages/Library/Library";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Practice, { loader as practiceLoader, action as practiceAction } from "./pages/Practice/Practice"
import Root from "./layouts/Root"
import FlashcardSets, { loader as setsLoader, action as setAction } from "./pages/Library/FlashcardSets"
import Vocabulary from "./pages/Library/Vocabulary";
import Characters from "./pages/Library/Characters";
import Sentences from "./pages/Library/Sentences";
import VocabSearch, { loader as searchLoader, action as searchAction} from "./components/VocabSearch/VocabSearch";


// Router for our website!!!! navigational logic happens here
const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Root />,
    children: [
      { path: "home", element: <Home />, },
      { path: "dictionary", element: <Dictionary />, 
        children: [
          { path: "search", element: <VocabSearch />, loader: searchLoader, action: searchAction },
        ],
      },
      { path: "library", element: <Library />, 
        children: [
          { path: "sets", element: <FlashcardSets />, loader: setsLoader, action: setAction },
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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
