import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Faculty, registerByBasic, University, User } from "../../client";
import { AdditionalRegistration } from "./AdditionalRegistration";


const RegisterPanel: FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [university, setUniversity] = useState<University>();
  const [faculty, setFaculty] = useState<Faculty>();
  const [showAdditionalDataWindow, setShowAdditionalDataWindow] = useState(false);

  const handleRegisterButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("button clicked");
    setShowAdditionalDataWindow(true);
  };

  const handleSubmitToBackend = async () => {
    if (!university || !faculty) {
      console.error("University or Faculty not selected. Please complete the additional registration details.");
      return;
    }

    const universityPayload: University = { ...university };
    if (universityPayload.image == null || universityPayload.image.imageData == null) {
      universityPayload.image = undefined;
    }

    const facultyForPayload = {
      id: faculty.id,
      name: faculty.name,
      code: faculty.code,
      description: faculty.description,
    };

    const newUser: User = {
      id: undefined,
      userName: username,
      email: email,
      firstName: firstName,
      lastName: lastName,
      faculty: facultyForPayload,
      role: "STUDENT",
      university: universityPayload,
      loginType: "LOCAL",
      passwordHash: password,
      description: "",
      balance: {
        id: undefined,
        userID: undefined,
        currentValue: 0,
        unit: "HUF",
        payType: "CREDIT"
      },
      image: undefined,
      ratings: 5.0
    };

    try {
      const { data, error } = await registerByBasic({
        body: newUser
      });

      if (error) {
        console.error("Registration failed:", error);
        // TODO: Display a user-friendly error message
      } else {
        console.log("Registration successful:", data);
        // TODO: Display a success message and/or navigate
        navigate('/login'); // Example: navigate to login on success
      }
    } catch (apiError) {
      console.error("An unexpected error occurred during registration:", apiError);
      // TODO: Display a generic user-friendly error message
    }
  };

  if (showAdditionalDataWindow) {
    return <AdditionalRegistration  handleSubmit={handleSubmitToBackend} setFaculty={(faculty) => setFaculty(faculty)} setUniversity={setUniversity}/>
  }

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
