import React, { useEffect, useState } from "react";
import { Faculty, getAllUniversitiesFaculties, University } from "../../client";


interface AdditionalRegistrationProp {
    setUniversity: (universities: University) => void,
    setFaculty: (faculties: Faculty) => void,
    handleSubmit: () => void
}

export const AdditionalRegistration: React.FC<AdditionalRegistrationProp> = ({setUniversity, setFaculty: setFaculity, handleSubmit}) => {
    const [universities, setUniversities] = useState<University[]>([]);
    const [faculties, setFaculities] = useState<Faculty[]>([]);

    useEffect(() =>{
        async function fetchUniversitiesAndFaculties() {
            const {data, error} = await getAllUniversitiesFaculties()
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
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}