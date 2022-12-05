const allItems = [
  {
    _name: 'CSidebarNavItem',
    name: ' Dashbord',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
    }
  },
  {
    _name: 'CSidebarNavItem',
    name: ' Employers',
    to: '/employers',
    icon: 'cil-people',
    badge: {
    }

  },
  {
    _name: 'CSidebarNavItem',
    name: 'Users',
    to: '/employees',
    icon: 'cil-chartPie',
    badge: {
    }
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Categories',
    to: '/categories',
    icon: 'cil-people',
    badge: {
    }

  },
  {
    _name: 'CSidebarNavItem',
    name: 'Jobs',
    to: '/jobs',
    icon: 'cil-calculator',
    badge: {
    }
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Job Applications',
    to: '/job-applications',
    icon: 'cil-calculator',
    badge: {
    }
  }

]

let userSidebar = []

if (localStorage.token) {
  userSidebar = allItems
} else {
  userSidebar = allItems
}

export default [
  {
    _name: 'CSidebarNav',
    _children: userSidebar
  }
]
