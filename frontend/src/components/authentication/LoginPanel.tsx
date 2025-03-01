import { FC } from "react";

interface LoginProps {
  onSwitch: () => void;
}

const Login: FC<LoginProps> = ({ onSwitch }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Bejelentkezés
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email cím</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="pelda@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Jelszó</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>

          <button className="w-full rounded-md bg-blue-600 p-3 text-white shadow-md transition hover:bg-blue-700">
            Bejelentkezés
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Nincs még fiókod?{" "}
          <button onClick={onSwitch} className="text-blue-500 hover:underline">
            Regisztrálj itt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
