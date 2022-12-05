import Vue from 'vue'
import Router from 'vue-router'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import i18n from '../i18n'
// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Loading = () => import('@/views/Loading')

// Views - Pages
const Login = () => import('@/views/Login')

// employers
const Employers = () => import('@/views/employers/Index')
const ShowEmployer = () => import('@/views/employers/Show')

// employees
const Employees = () => import('@/views/employees/Index')
const ShowEmployee = () => import('@/views/employees/Show')

// Jobs
const Jobs = () => import('@/views/jobs/Index')
const CreateJob = () => import('@/views/jobs/Create')
const EditJob = () => import('@/views/jobs/Edit')
const ShowJob = () => import('@/views/jobs/Show')

// Categories
const Categories = () => import('@/views/categories/Index')

// Jobs Applications
const JobsApplications = () => import('@/views/applications/Index')
const ShowJobApplications = () => import('@/views/applications/Show')

Vue.use(Router)
Vue.use(VueTabs)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {

      path: '/',
      redirect: '/loading',
      name: i18n.t('message.main'),
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: i18n.t('message.dashboard'),
          component: Dashboard
        },
        // Employers
        {
          path: 'employers',
          meta: {
            label: 'Employers'
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Employers',
              component: Employers
            },
            {
              path: ':id/show',
              name: 'Show an Employer ',
              component: ShowEmployer
            }
          ]
        },
        // Employees
        {
          path: 'employees',
          meta: {
            label: 'Employees'
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Employees',
              component: Employees
            },
            {
              path: ':id/show',
              name: 'Show an Employee ',
              component: ShowEmployee
            }
          ]
        },
        // Categories
        {
          path: 'categories',
          meta: {
            label: 'Categories'
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Categories',
              component: Categories
            }
          ]
        },
        // jobs
        {
          path: 'jobs',
          meta: {
            label: 'Jobs'
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Jobs',
              component: Jobs
            },
            {
              path: 'create',
              name: ' Add Job ',
              component: CreateJob
            },
            {
              name: '  Edit Job',
              path: ':id/edit',
              component: EditJob
            },
            {
              name: '  Show Job',
              path: ':id/show',
              component: ShowJob
            }
          ]
        },
        // jobApplications
        {
          path: 'job-applications',
          meta: {
            label: 'Jobs Applications'
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Jobs Applications',
              component: JobsApplications
            },
            {
              name: '  Show Job Application',
              path: ':id/show',
              component: ShowJobApplications
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      name: 'Login'
    },
    {
      path: '/loading',
      component: Loading,
      name: 'Loading'
    }
  ]
}
