import { Fragment } from "react";
import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";

import { AnalysisViewPage } from "@/app/home/AnalysisViewPage";
import { GoalViewPage } from "@/app/home/GoalViewPage";
import { RetrospectViewPage } from "@/app/home/RetrospectViewPage";
import { KaKaoRedirection } from "@/app/login/KakaoLoginRedirection";
import { LoginPage } from "@/app/login/LoginPage";
import { SetNickNamePage } from "@/app/login/SetNicknamePage";
import { RetrospectCreate } from "@/app/retrospectCreate/RetrospectCreate";
import { RetrospectCreateComplete } from "@/app/retrospectCreate/RetrospectCreateComplete";
import { CreateDonePage } from "@/app/space/CreateDonePage";
import { CreateSpacePage } from "@/app/space/CreateSpacePage";
import { SpaceViewPage } from "@/app/space/SpaceViewPage";
import Staging from "@/app/test/Staging.tsx";
import { RetrospectWriteCompletePage } from "@/app/write/RetrospectWriteCompletePage.tsx";
import { RetrospectWritePage } from "@/app/write/RetrospectWritePage.tsx";
import GlobalLayout from "@/layout/GlobalLayout.tsx";
import { HomeLayout } from "@/layout/HomeLayout";
import { RequireLoginLayout } from "@/layout/RequireLoginLayout";

type RouteChildren = {
  auth: boolean;
} & RouteObject;

const routerChildren: RouteChildren[] = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <RetrospectViewPage />,
      },
      {
        path: "analysis",
        element: <AnalysisViewPage />,
      },
      {
        path: "goals",
        element: <GoalViewPage />,
      },
    ],
    auth: true,
  },
  {
    path: "/write",
    element: <RetrospectWritePage />,
    auth: true,
  },
  {
    path: "/write/complete",
    element: <RetrospectWriteCompletePage />,
    auth: true,
  },
  {
    path: "/staging",
    element: <Staging />,
    auth: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    auth: false,
  },
  {
    path: "/setnickname",
    element: <SetNickNamePage />,
    auth: false,
  },
  {
    path: "/space/create",
    element: <CreateSpacePage />,
    auth: true,
  },
  {
    path: "/space/create/done",
    element: <CreateDonePage />,
    auth: true,
  },
  {
    path: "/space/:spaceId",
    element: <SpaceViewPage />,
    auth: true,
  },
  {
    path: "/home",
    element: <HomePage />,
    auth: true,
    children: [
      {
        path: "analysis",
        element: <AnalysisViewPage />,
      },
      {
        path: "goals",
        element: <GoalViewPage />,
      },
      {
        path: "retrospect",
        element: <RetrospectViewPage />,
      },
    ],
  },
  { path: "/api/auth/oauth2/kakao", element: <KaKaoRedirection />, auth: false },
  {
    path: "/retrospect/new",
    element: <RetrospectCreate />,
    auth: true,
  },
  {
    path: "/retrospect/complete",
    element: <RetrospectCreateComplete />,
    auth: true,
  },
];

const browserRouter = routerChildren.map(({ path, element, auth, children }) => {
  return {
    path,
    element: auth ? <RequireLoginLayout>{element}</RequireLoginLayout> : element,
    children: children?.map((child) => ({
      path: child.path,
      element: auth ? <RequireLoginLayout>{child.element}</RequireLoginLayout> : child.element,
    })),
  };
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    errorElement: <Fragment />,
    children: browserRouter,
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
