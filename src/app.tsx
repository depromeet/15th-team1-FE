import "@/style/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
// import { DevTools } from "jotai-devtools";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { Toast } from "./component/common/Toast";
import { Routers } from "./router";

import { queryClient } from "@/lib/tanstack-query/queryClient";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={"..loading"}>
      <Toast />
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* <DevTools /> */}
        <Routers />
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>,
);
