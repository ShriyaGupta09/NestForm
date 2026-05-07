import React, { useState, useEffect } from 'react';
import QuestionItem from '../components/QuestionItem';
import Sidebar from '../components/Sidebar';

const generateId = () => Date.now() + Math.random();

const BuilderPage = () => {

    const [questions, setQuestions] = useState(() => {
        const saved = localStorage.getItem('questions');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {

        localStorage.setItem(
            'questions',
            JSON.stringify(questions)
        );

        fetch('http://localhost:5000/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questions),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));

    }, [questions]);

    const addParentQuestion = () => {

        const newQuestion = {
            id: generateId(),
            text: '',
            type: 'Short Answer',
            answer: '',
            userAnswer: '',
            children: [],
        };

        setQuestions([...questions, newQuestion]);
    };

    const updateQuestion = (
        id,
        updatedData,
        items = questions
    ) => {

        return items.map((item) => {

            if (item.id === id) {
                return {
                    ...item,
                    ...updatedData,
                };
            }

            return {
                ...item,
                children: updateQuestion(
                    id,
                    updatedData,
                    item.children
                ),
            };
        });
    };

    const handleUpdate = (id, data) => {
        setQuestions((prev) =>
            updateQuestion(id, data, prev)
        );
    };

    const deleteQuestion = (
        id,
        items = questions
    ) => {

        return items
            .filter((item) => item.id !== id)
            .map((item) => ({
                ...item,
                children: deleteQuestion(
                    id,
                    item.children
                ),
            }));
    };

    const handleDelete = (id) => {
        setQuestions((prev) =>
            deleteQuestion(id, prev)
        );
    };

    const addChildQuestion = (
        parentId,
        items = questions
    ) => {

        return items.map((item) => {

            if (item.id === parentId) {

                const child = {
                    id: generateId(),
                    text: '',
                    type: 'Short Answer',
                    answer: '',
                    userAnswer: '',
                    children: [],
                };

                return {
                    ...item,
                    children: [
                        ...item.children,
                        child,
                    ],
                };
            }

            return {
                ...item,
                children: addChildQuestion(
                    parentId,
                    item.children
                ),
            };
        });
    };

    const handleAddChild = (parentId) => {
        setQuestions((prev) =>
            addChildQuestion(parentId, prev)
        );
    };

    return (

        <div className="bg-slate-200 min-h-screen pt-20">

            <Sidebar />

            <div className="p-10">

                <div
                    className="
                        bg-white
                        mx-auto
                        shadow-md
                        p-12
                    "
                    style={{
                        width: '794px',
                        minHeight: '1123px',
                    }}
                >

                    <div className="flex justify-between items-center mb-12">

                        <div>

                            <h1 className="text-4xl font-semibold text-slate-800 tracking-tight">
                                Form Builder
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Create nested questions dynamically
                            </p>

                        </div>

                        <button
                            onClick={addParentQuestion}
                            className="
                                text-blue-600
                                hover:text-blue-800
                                hover:underline
                                transition
                                font-medium
                            "
                        >
                            + Add Question
                        </button>

                    </div>

                    <div className="space-y-6">

                        {questions.map((question, index) => (

                            <QuestionItem
                                key={question.id}
                                question={question}
                                numbering={`Q${index + 1}`}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                                onAddChild={handleAddChild}
                                level={0}
                            />

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default BuilderPage;