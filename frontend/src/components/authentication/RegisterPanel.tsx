import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContextProvider";
import { RegisterType, RegistrationInfo } from "../../dto/RegistrationInfo";
import { SimpleUser } from "../../dto/SimpleUser";


const RegisterPanel: FC = () => {
  const { setRegistrationInfo } = useAppContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegisterButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegistrationContext();
    navigate("/register/additional");
  };

  const setRegistrationContext = async () => {
    const newUser: SimpleUser = {
      userName: username,
      email: email,
      firstName: firstName,
      lastName: lastName,
      passkey: password,
    };

    const registrationInfo: RegistrationInfo = {
      user: newUser,
      registerType: RegisterType.BASIC
    }

    setRegistrationInfo(registrationInfo);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Regisztráció
        </h2>

        <form className="space-y-4" onSubmit={handleRegisterButton}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Felhasználónév
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Felhasználónév"
              required
            />
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vezetéknév
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Vezetéknév"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Keresztnév
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Keresztnév"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email cím
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="pelda@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jelszó
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>

          <button type="submit" className="w-full rounded-md bg-blue-600 p-3 text-white shadow-md transition hover:bg-blue-700">
            Regisztráció
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Már van fiókod?{" "}
          <button onClick={() => navigate('/login')} className="text-blue-500 hover:underline">
            Bejelentkezés
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPanel;
