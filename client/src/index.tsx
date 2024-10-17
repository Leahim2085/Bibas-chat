import { createRoot } from "react-dom/client";
import App from "@app/index";
import "@app/styles/global.css";

createRoot(document.getElementById("root")!).render(<App />);
