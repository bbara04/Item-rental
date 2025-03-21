import axios from "axios";
import { useState } from "react";
import { User } from "../../dto/User";
import NavigationService from "../../NavigationService";
import GoogleLoginComponent from "./GoogleLoginComponent";

type LoginProps = {
  setGlobalUser: (user: User) => void;
};

const Login = ({setGlobalUser}: LoginProps) => {
  const ipAddress = import.meta.env.VITE_SERVER_IP_ADDRESS;
  const port = import.meta.env.VITE_SERVER_PORT;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`http://${ipAddress}:${port}/api/auth/basic/login`, {
        email: email,
        passkey: password,
      });

      console.log("Login successful:", response.data);

      setGlobalUser(response.data);
      NavigationService.goToHome();
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Hibás bejelentkezési adatok");
      } else {
        setError("Hibás bejelentkezési adatok");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Bejelentkezés
        </h2>

        {error && <p className="mb-4 text-center text-sm text-red-500">{error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email cím
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="pelda@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jelszó
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-3 text-white shadow-md transition hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
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
          <button onClick={() => NavigationService.goToRegister()} className="text-blue-500 hover:underline">
            Regisztrálj itt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
