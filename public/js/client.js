import { initializeDefaultNamespace } from "./namespaces/default.js";
import { initializeEditorNamespace } from "./namespaces/editor.js";

if (window.location.pathname === "/editor") {
  initializeEditorNamespace();
} else {
  initializeDefaultNamespace();
}
