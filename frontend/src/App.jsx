import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';

import Home from "./routes/Home";
import Dictionary from "./routes/Dictionary";
import Library from "./routes/Library/Library";
import Stats from "./routes/Stats";
import Settings from "./routes/Settings";
import Practice, { loader as practiceLoader, action as practiceAction } from "./routes/Practice/Practice"
import Root from "./routes/Root/Root"
import FlashcardSets, { loader as setsLoader, action as setAction } from "./routes/Library/FlashcardSets"
import Vocabulary from "./routes/Library/Vocabulary";
import Characters from "./routes/Library/Characters";
import Sentences from "./routes/Library/Sentences";


// Router for our website!!!! navigational logic happens here
const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Root />,
    children: [
      { path: "home", element: <Home />, },
      { path: "dictionary", element: <Dictionary />, },
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
