import { NavLink } from 'react-router-dom'

function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Users', path: '/users' },
    { name: 'Students', path: '/students' },
    { name: 'Teachers', path: '/teachers' },
    { name: 'Leads', path: '/leads' },
    { name: 'Courses', path: '/courses' },
    { name: 'Classes', path: '/classes' },
    { name: 'Payments', path: '/payments' },
  ]

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-white border-r p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 ${
                isActive
                  ? 'bg-blue-100 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar