import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')
    setMessage('')

    if (!email) {
      setError('Vui lòng nhập email.')
      return
    }

    try {
      setLoading(true)

      /*
        SAU NÀY KẾT NỐI BACKEND

        await authService.forgotPassword({
          email,
        })
      */

      console.log('Forgot password:', email)

      setMessage(
        'Nếu email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu sẽ được gửi đến bạn.'
      )
    } catch {
      setError('Không thể gửi yêu cầu. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>

      {/* Heading */}
      <div className="mb-8">
        <Link
          to="/login"
          className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Quay lại đăng nhập
        </Link>

        <p className="mb-2 text-sm font-semibold text-blue-600">
          KHÔI PHỤC TÀI KHOẢN
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Quên mật khẩu?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Nhập email đã đăng ký. Chúng tôi sẽ gửi hướng
          dẫn để bạn đặt lại mật khẩu.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Success */}
      {message && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label
            htmlFor="forgot-email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            autoComplete="email"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Đang gửi...' : 'Gửi hướng dẫn'}
        </button>

      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Nhớ mật khẩu rồi?{' '}
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

export default ForgotPassword