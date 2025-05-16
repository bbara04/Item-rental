import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContextProvider";
import { Faculty, getAllUniversitiesFaculties, registerByBasic, UniversitiesResponse, University, User } from "../../client";
import { RegisterType } from "../../dto/RegistrationInfo";

export const AdditionalRegistration: React.FC = () => {
    const { registrationInfo, setUser } = useAppContext();
    const [allUniversitiesFaculties, setAllUniversitiesFaculties] = useState<UniversitiesResponse>();
    const [universities, setUniversities] = useState<University[]>([]);
    const [faculties, setFaculities] = useState<Faculty[]>([]);
    const [university, setUniversity] = useState<University>();
    const [faculty, setFaculity] = useState<Faculty>();
    const navigate = useNavigate();

    const handleSubmitToBackend = async () => {
        if (registrationInfo == undefined) {
            console.error("Registration info is undefined");
            return;
        }

        const user = registrationInfo?.user;

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
            userName: user?.userName,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            faculty: facultyForPayload,
            role: "STUDENT",
            university: universityPayload,
            loginType: "LOCAL",
            passwordHash: user.passkey,
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
            switch (registrationInfo.registerType) {
                case RegisterType.BASIC:
                    {
                        const { data, error } = await registerByBasic({
                            body: newUser
                        });
                        if (error) {
                            console.error("Registration failed:", error);
                            navigate("/login");
                            // TODO: Display a user-friendly error message
                        } else {
                            console.log("Registration successful:", data);
                            // TODO: Display a success message and/or navigate
                            if (data) {
                                setUser(data);
                            }
                            navigate("/");
                        }
                        break;
                    }
                case RegisterType.GOOGLE:
                    {
                        newUser.loginType = "GOOGLE";
                        const { data: googleData, error: googleError } = await registerByBasic({
                            body: newUser
                        });
                        if (googleError) {
                            console.error("Registration failed:", googleError);
                            // TODO: Display a user-friendly error message
                        } else {
                            console.log("Registration successful:", googleData);
                            // TODO: Display a success message and/or navigate
                            if (googleData) {
                                setUser(googleData);
                            }
                            navigate("/");
                        }
                        break;
                    }
            }

        } catch (apiError) {
            console.error("An unexpected error occurred during registration:", apiError);
            // TODO: Display a generic user-friendly error message
        }
    };

    const onSelectUniversity = (university: University) => {
        setUniversity(university);
        const facultiesAtUniversity = allUniversitiesFaculties?.faculties.filter((faculty) => faculty.university?.id === university.id);
        setFaculities(facultiesAtUniversity || []);
    };

    useEffect(() => {
        async function fetchUniversitiesAndFaculties() {
            const { data, error } = await getAllUniversitiesFaculties()
            if (error) {
                console.error("Error fetching universities and faculties:", error);
            } else {
                setAllUniversitiesFaculties(data);
                setUniversities(data.universities);
                setFaculities([]);
            }
        }
        fetchUniversitiesAndFaculties();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="p-8 max-w-md w-full shadow-lg rounded-md bg-white">
                <h2 className="text-2xl font-semibold text-center mb-8">Regisztráció</h2>
                
                <div className="mb-5">
                    <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                        University
                    </label>
                    <select
                        id="university"
                        name="university"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={university?.id || ""}
                        onChange={(e) => {
                            const selectedUniversity = universities.find((uni) => uni.id === parseInt(e.target.value, 10));
                            if (selectedUniversity) {
                                onSelectUniversity(selectedUniversity);
                            } else {
                                setUniversity(undefined);
                            }
                        }}
                    >
                        <option value="" disabled>Select University</option>
                        {universities.map((uni) => (
                            <option key={uni.id} value={uni.id}>
                                {uni.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-5">
                    <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">
                        Faculty
                    </label>
                    <select
                        id="faculty"
                        name="faculty"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={faculty?.id || ""}
                        onChange={(e) => {
                            const selectedFaculty = faculties.find((fac) => fac.id === parseInt(e.target.value, 10));
                            if (selectedFaculty) {
                                setFaculity(selectedFaculty);
                            } else {
                                setFaculity(undefined);
                            }
                        }}
                    >
                        <option value="" disabled>Select Faculty</option>
                        {faculties.map((faculty) => (
                            <option key={faculty.id} value={faculty.id}>
                                {faculty.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <button
                    type="button"
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    onClick={handleSubmitToBackend}
                >
                    Regisztráció
                </button>
                
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Már van fiókod? <a href="/login" className="text-blue-500 hover:underline">Bejelentkezés</a>
                    </p>
                </div>
            </div>
        </div>
    );
}