import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContextProvider";
import { Faculty, getAllUniversitiesFaculties, registerByBasic, University, User } from "../../client";
import { RegisterType } from "../../dto/RegistrationInfo";

export const AdditionalRegistration: React.FC = () => {
    const { registrationInfo, setUser } = useAppContext();
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
                        const { data: googleData, error: googleError } = await registerByBasic({
                            body: newUser
                        });
                        if (googleError) {
                            console.error("Registration failed:", googleError);
                            // TODO: Display a user-friendly error message
                        } else {
                            console.log("Registration successful:", data);
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

    useEffect(() => {
        async function fetchUniversitiesAndFaculties() {
            const { data, error } = await getAllUniversitiesFaculties()
            if (error) {
                console.error("Error fetching universities and faculties:", error);
            } else {
                setUniversities(data.universities);
                setFaculities(data.faculties);
            }
        }
        fetchUniversitiesAndFaculties();
    }, []);

    return (
        <div className="flex justify-center items-center">
            <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
                <h2 className="text-2xl font-semibold text-center mb-6">Complete Registration</h2>
                <div className="mb-4">
                    <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                        University
                    </label>
                    <select
                        id="university"
                        name="university"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => {
                            const selectedUniversity = universities.find((uni) => uni.name === e.target.value);
                            if (selectedUniversity) {
                                setUniversity(selectedUniversity);
                            }
                        }}
                    >
                        <option value="">Select University</option>
                        {universities.map((uni) => (
                            <option key={uni.id} value={uni.name}>
                                {uni.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">
                        Faculty
                    </label>
                    <select
                        id="faculty"
                        name="faculty"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => {
                            const selectedFaculty = faculties.find((fac) => fac.name === e.target.value);
                            if (selectedFaculty) {
                                setFaculity(selectedFaculty);
                            }
                        }}
                    >
                        <option value="">Select Faculty</option>
                        {faculties.map((faculty) => (
                            <option key={faculty.id} value={faculty.name}>
                                {faculty.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                        onClick={handleSubmitToBackend}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}