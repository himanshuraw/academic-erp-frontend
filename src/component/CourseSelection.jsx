import React, { useState } from 'react';
import Select from 'react-select';
import useCourses from '../hooks/useCourses';
import Button from './Button';
import { checkLoginStatus } from '../ulit/checkLoginStatus';
import { submitCourses } from '../api/facultyApi';
import { useNavigate, useParams } from 'react-router';

const CourseSelection = () => {
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [error, setError] = useState(null);
    const { email } = useParams();
    const navigate = useNavigate();

    const { courses, loading, error: fetchError } = useCourses();

    const courseOptions = courses.map(course => ({
        value: course.id,
        label: course.name,
        schedules: course.schedules,
    }));

    const handleCourseSubmit = async (e) => {
        e.preventDefault();
        if (error) return;

        const courseIds = selectedCourses.map(course => course.value);

        try {
            const response = await submitCourses(email, courseIds);
            navigate("/");
        } catch (error) {
            setError('Failed to add courses');
        }

        console.log('Submitted courses:', selectedCourses);
    };

    const checkForScheduleConflicts = (selectedCourses) => {
        const selectedSchedules = selectedCourses.flatMap(course => course.schedules);

        for (let i = 0; i < selectedSchedules.length; i++) {
            for (let j = i + 1; j < selectedSchedules.length; j++) {
                if (
                    selectedSchedules[i].day === selectedSchedules[j].day &&
                    selectedSchedules[i].time === selectedSchedules[j].time
                ) {
                    return true;
                }
            }
        }
        return false;
    };

    const handleCourseChange = (selectedOptions) => {
        setError(null);

        setSelectedCourses(selectedOptions || []);

        const hasConflict = checkForScheduleConflicts(selectedOptions || []);

        if (hasConflict) {
            setError('There are overlapping schedules between selected courses!');
        }
    };

    if (loading) {
        return <div>loading...</div>;
    }

    if (fetchError) {
        return <div>Error: {fetchError.message}</div>;
    }

    return (
        <div className='relative w-[90vw] sm:w-[70vw] lg:w-[35vw]'>
            <div className={`absolute -inset-1 shadow-md rounded-lg bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 blur`} />
            <div className="relative p-10 shadow-md rounded-lg bg-[#070707]">
                <h2 className="text-2xl font-bold text-center mb-6">Course selection</h2>

                <form onSubmit={handleCourseSubmit}>
                    <div>
                        <label htmlFor="courses" className="block text-sm font-medium text-white">Courses</label>
                        <Select
                            id="courses"
                            name="courses"
                            isMulti
                            options={courseOptions}
                            value={selectedCourses}
                            onChange={handleCourseChange}
                            className="mt-1 w-full"
                            classNamePrefix="select"
                            getOptionLabel={(e) => e.label}
                            getOptionValue={(e) => e.value}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: '#070707',
                                    color: 'white',
                                    borderColor: '#333',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        borderColor: '#444',
                                    },
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: '#070707', color: 'white',
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected ? '#4c8bf5' : state.isFocused ? '#333' : '#070707',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#333',
                                    },
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: '#444',
                                    color: 'white',
                                }),
                                multiValueLabel: (base) => ({
                                    ...base,
                                    color: 'white',
                                }),
                                multiValueRemove: (base) => ({
                                    ...base,
                                    color: 'white',
                                    ':hover': {
                                        backgroundColor: 'red',
                                    },
                                }),
                            }}
                        />
                    </div>

                    {error && (
                        <div className="mt-3 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        label="Submit"
                        onClick={handleCourseSubmit}
                        type="submit"
                    />
                </form>
            </div>
        </div>
    );
};

export default CourseSelection;
