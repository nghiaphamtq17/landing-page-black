'use client';
import { useEffect } from "react";
import './guestbook.css';  // Importiere die externe CSS-Datei

export default function Guestbook() {
  useEffect(() => {
    // Füge den giscus-Script-Tag ein
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.setAttribute("data-repo", "GylanSalih/NextJS-Portify");
    script.setAttribute("data-default-comment-order", "oldest");
    script.setAttribute("data-repo-id", "R_kgDONsIjJw");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDONsIjJ84CmWBt");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "dark");  // Setze das benutzerdefinierte Theme
    script.setAttribute("data-lang", "de");
    script.setAttribute("data-loading", "lazy");
    script.setAttribute("crossorigin", "anonymous");
    document.getElementById("giscus-container").appendChild(script);
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="guestbook-title">Guestbook</h1>
      <p className="guestbook-description">Leave a message in the guestbook!</p>
      <div id="giscus-container"></div>
    </div>
  );
}
