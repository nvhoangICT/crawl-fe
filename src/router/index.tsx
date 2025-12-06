import AuthLayout from "@/layout/AuthLayout";
import DefaultLayout from "@/layout/DefaultLayout";
import RestaurantManagementPage from "@/pages/restaurant-management";
import ServiceManagementPage from "@/pages/service-management";
import TrainTicketManagementPage from "@/pages/train-ticket-management";
import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import RentalManagement from "@/pages/rental-management.tsx";
import CarRentalManagement from "@/pages/car-rental-management.tsx";
import MotorbikeRentalManagement from "@/pages/motorbike-rental-management.tsx";
import TravellingCarBookingManagement from "@/pages/travelling-car-booking-management.tsx";
import MarketPlaceManagementPage from "@/pages/marketplace-management";
import BusManagementPage from "@/pages/bus-management";
import SpaManagementPage from "@/pages/spa-management";
import LandmarkManagementPage from "@/pages/landmark-management";
import AirportTransferManagementPage from "@/pages/airport-transfer-management";
import AttractionManagement from "@/pages/attraction-management";

const Index = lazy(() => import("@/pages"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const CrawlDataPage = lazy(() => import("@/pages/crawl-data"));
const HotelManagementPage = lazy(() => import("@/pages/hotel-management"));
const LoginPage = lazy(() => import("@/pages/login"));
const RegisterPage = lazy(() => import("@/pages/register"));

export const routesOutlets = [
  {
    element: (
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    ),
    children: [
      {
        path: "/admin",
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/admin/crawl",
        index: true,
        element: <CrawlDataPage />,
      },
      {
        path: "/admin/hotel-management",
        index: true,
        element: <HotelManagementPage />,
      },
      {
        path: "/admin/restaurant-management",
        index: true,
        element: <RestaurantManagementPage />,
      },
      {
        path: "/admin/service-management",
        index: true,
        element: <ServiceManagementPage />,
      },
      {
        path: "/admin/train-ticket-management",
        index: true,
        element: <TrainTicketManagementPage />,
      },
      {
        path: "/admin/rental-management",
        index: true,
        element: <RentalManagement />,
      },
      {
        path: "/admin/attraction-management",
        index: true,
        element: <AttractionManagement />,
      },

      {
        path: "/admin/rental-management/car",
        index: true,
        element: <CarRentalManagement />,
      },
      {
        path: "/admin/rental-management/airport-transfer",
        index: true,
        element: <AirportTransferManagementPage />,
      },
      {
        path: "/admin/rental-management/motorcycle",
        index: true,
        element: <MotorbikeRentalManagement />,
      },
      {
        path: "/admin/rental-management/traveling-car",
        index: true,
        element: <TravellingCarBookingManagement />,
      },
      {
        path: "/admin/marketplace-management",
        index: true,
        element: <MarketPlaceManagementPage />,
      },
      {
        path: "/admin/bus-management",
        index: true,
        element: <BusManagementPage />,
      },
      {
        path: "/admin/spa-management",
        index: true,
        element: <SpaManagementPage />,
      },
      {
        path: "/admin/landmark-management",
        index: true,
        element: <LandmarkManagementPage />,
      },
    ],
  },
  {
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      {
        path: "/",
        index: true,
        element: <Index />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate replace to="/" />,
  },
];
