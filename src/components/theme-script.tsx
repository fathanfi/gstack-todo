"use client";

export default function ThemeScript() {
  // Inline script to avoid theme flash before React hydrates.
  const code = `(function(){
try{
  var key="todo-gstack-theme";
  var t=localStorage.getItem(key)||"system";
  var sys=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
  var resolved=(t==="system")?sys:t;
  var d=document.documentElement;
  if(resolved==="dark"){d.classList.add("dark")}else{d.classList.remove("dark")}
  d.dataset.theme=t;
}catch(e){}
})();`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}

