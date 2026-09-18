import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left - Branding */}
        <div className="relative hidden overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950" />

          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-bold text-blue-700 shadow-lg">
                  A
                </div>

                <div>
                  <h1 className="text-xl font-bold text-white">
                    Admission Chatbot
                  </h1>

                  <p className="text-sm text-blue-100">
                    AI hỗ trợ tuyển sinh
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                Smart Admission
              </p>

              <h2 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                Trợ lý tuyển sinh
                <br />
                thông minh
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-blue-100">
                Hỗ trợ tra cứu thông tin tuyển sinh,
                ngành học và giải đáp các câu hỏi
                nhanh chóng bằng công nghệ AI.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                  AI Assistant
                </span>

                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                  Tuyển sinh
                </span>

                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                  24/7
                </span>
              </div>
            </div>

            {/* Footer */}
            <p className="text-sm text-blue-200">
              © 2026 Admission Chatbot
            </p>
          </div>
        </div>

        {/* Right - Authentication */}
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6 lg:px-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  )
}

export default AuthLayout