import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContextProvider";
import { loginByBasic } from "../../client";
import GoogleLoginComponent from "./GoogleLoginComponent";


const LoginPanel: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppContext();
  const { baseColor } = useAppContext(); // Added baseColor
  const style = { '--user-bg-color': baseColor } as React.CSSProperties; // Added style object
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const {data, error} = await loginByBasic({
      body: {
        email: email,
        passkey: password,
      },
    });
    if (error) {
      setError("Failed to login with current user");
      setLoading(false);
      return;
    }
    setUser(data);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Bejelentkezés
        </h2>

        {error && <p className="mb-4 text-center text-sm text-red-500">{error}</p>}

        <form className="space-y-6" autoComplete="on" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email cím
            </label>
            <input
              id="email"
              name="username" // identify as the username/email field
              type="email"
              autoComplete="username" // helps the browser autofill with saved usernames
              className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-[var(--user-bg-color)] focus:ring-1 focus:ring-[var(--user-bg-color)]"
              placeholder="pelda@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={style} // Added style
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Jelszó
            </label>
            <input
              id="password"
              name="current-password" // identify as the current password field
              type="password"
              autoComplete="current-password" // signals the browser that this is a password field
              className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-[var(--user-bg-color)] focus:ring-1 focus:ring-[var(--user-bg-color)]"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={style} // Added style
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[var(--user-bg-color)] p-3 text-white shadow-md transition hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
            style={style} // Added style
          >
            {loading ? "Bejelentkezés..." : "Bejelentkezés"}
          </button>
        </form>


        <div className="flex flex-col items-center">
          <p>or</p>
          <GoogleLoginComponent></GoogleLoginComponent>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Nincs még fiókod?{" "}
          <button onClick={() => navigate('/register')} className="text-blue-500 hover:underline">
            Regisztrálj itt
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
