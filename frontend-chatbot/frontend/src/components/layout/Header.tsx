function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-blue-600">
        Admission Chatbot
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">
          Admin
        </span>

        <button
          type="button"
          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  )
}

export default Header