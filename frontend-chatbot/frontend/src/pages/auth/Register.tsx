import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')

    // Kiểm tra dữ liệu
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Vui lòng nhập đầy đủ thông tin.')
      return
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.')
      return
    }

    try {
      setLoading(true)

      /*
        SAU NÀY KẾT NỐI BACKEND TẠI ĐÂY:

        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      */

      console.log('Register data:', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

    } catch {
      setError('Đăng ký thất bại. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Logo trên mobile */}
      <div className="mb-8 flex items-center gap-3 lg:hidden">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
          A
        </div>

        <div>
          <h1 className="font-bold text-slate-900">
            Admission Chatbot
          </h1>

          <p className="text-xs text-slate-500">
            AI hỗ trợ tuyển sinh
          </p>
        </div>
      </div>

      {/* Tiêu đề */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-blue-600">
          TẠO TÀI KHOẢN
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Đăng ký
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Tạo tài khoản để bắt đầu sử dụng hệ thống.
        </p>
      </div>

      {/* Thông báo lỗi */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Họ tên */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Họ và tên
          </label>

          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            placeholder="Nguyễn Văn A"
            autoComplete="name"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="register-email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            id="register-email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            placeholder="example@email.com"
            autoComplete="email"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Mật khẩu */}
        <div>
          <label
            htmlFor="register-password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Mật khẩu
          </label>

          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              placeholder="Nhập mật khẩu"
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-16 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              {showPassword ? 'Ẩn' : 'Hiện'}
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Mật khẩu tối thiểu 6 ký tự.
          </p>
        </div>

        {/* Xác nhận mật khẩu */}
        <div>
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Xác nhận mật khẩu
          </label>

          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
              placeholder="Nhập lại mật khẩu"
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-16 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              {showConfirmPassword ? 'Ẩn' : 'Hiện'}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
        </button>
      </form>

      {/* Login */}
      <p className="mt-8 text-center text-sm text-slate-500">
        Đã có tài khoản?{' '}

        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Đăng nhập
        </Link>
      </p>
    </div>
  )
}

export default Register