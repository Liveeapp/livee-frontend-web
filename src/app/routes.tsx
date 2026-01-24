import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { BusinessListPage } from "@/features/business/pages/BusinessListPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { MainLayout } from "@/shared/layout/MainLayout";
import { ProtectedRoutes } from "@/features/auth/components/ProtectedRoutes";
import { ROUTES } from "@/shared/constants";

export const router = createBrowserRouter([
  {
    path: ROUTES.AUTH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.ROOT,
    element: <ProtectedRoutes />,
    children: [
      {
        path: ROUTES.ROOT,
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />,
          },
          {
            path: ROUTES.ADMIN.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: ROUTES.ADMIN.BUSINESSES,
            element: <BusinessListPage />,
          },
          {
            path: ROUTES.ADMIN.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: "*",
            element: <Navigate to={ROUTES.ROOT} replace />,
          },
        ],
      },
    ],
  },
], {
  basename: "/internal/admin",
});
