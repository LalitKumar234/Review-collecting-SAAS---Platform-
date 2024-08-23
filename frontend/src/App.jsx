import { useEffect, useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { BrowserRouter as Router, Routes, Route, useNavigate, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import Login from './views/authentication/Login'
import Home from './views/dashboard/Home'
import PrivateRoutes from './components/PrivateRoutes'
import Register from './views/authentication/Register'
import { backendConfig } from './config'
import DashboardLayout from './layouts/DashboardLayout'
import ErrorPage from './views/dashboard/ErrorPage'
import PublicRoutes from './routes/PublicRoutes'
import Forms from './views/dashboard/Forms/Forms'
import Create from './views/dashboard/Forms/Create'
import FormsLayout from './layouts/FormsLayout'
import Settings from './views/dashboard/Forms/Settings'
import ChooseTemplates from './views/dashboard/Forms/ChooseTemplates'
import Preview from './views/dashboard/Forms/Preview'
import IntegrateApps from './views/dashboard/IntegrateApps'
import { useSelector } from 'react-redux'
import Builder from './views/builder'
import LiveSubmitFormPage from './views/submit'
import Studio from './views/studio'
import Editor from './views/studio/editor'
import RenderTestimonial from './views/testimonial'
import WallOfLove from './views/wallOfLove'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoutes />}>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/signup" />
        {/* <Route index element={<Navigate to="/login" />} /> */}
      </Route>

      {/* Private Routes */}
      <Route path="/" element={<DashboardLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path='integrate-apps' element={<IntegrateApps />} />
        {/* <Route path="studio">
          <Route index element={<Studio />}></Route>
        </Route> */}
        <Route path="testimonial" element={<RenderTestimonial />}></Route>
        <Route path="form" element={<Builder />}></Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="preview/:id" element={<Preview />}></Route>
      <Route path="submit/:id" element={<LiveSubmitFormPage />}></Route>
      <Route path="widget/:id" element={<Editor />}></Route>
      <Route path="wall-of-love/:id" element={<WallOfLove />}></Route>
    </>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
