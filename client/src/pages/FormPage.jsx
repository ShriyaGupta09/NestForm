import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const FormQuestion = ({
    question,
    numbering,
    handleAnswer,
    handleAddFollowUp,
    level,
}) => {

    const [newQuestion, setNewQuestion] = useState('');

    const bgColors = [
        'bg-blue-50',
        'bg-blue-100',
        'bg-blue-200',
        'bg-blue-300',
    ];

    return (

        <div
            className={`
                ${bgColors[level % bgColors.length]}
                p-6
                transition-all
            `}
        >

            {/* Question Header */}
            <div className="flex items-center gap-3 mb-5">

                <span className="font-bold text-slate-700">
                    {numbering}
                </span>

                <p className="text-slate-800 flex-1">
                    {question.text}
                </p>

            </div>

            {/* Answer Input */}
            {question.type === 'Short Answer' ? (

                <input
                    type="text"
                    placeholder="Write your answer..."
                    value={question.userAnswer || ''}
                    onChange={(e) =>
                        handleAnswer(question.id, e.target.value)
                    }
                    className="
                        w-full
                        bg-transparent
                        border-b
                        border-slate-400
                        focus:outline-none
                        focus:border-slate-700
                        py-2
                    "
                />

            ) : (

                <select
                    value={question.userAnswer || ''}
                    onChange={(e) =>
                        handleAnswer(question.id, e.target.value)
                    }
                    className="
                        bg-transparent
                        border-b
                        border-slate-400
                        focus:outline-none
                        py-2
                    "
                >
                    <option value="">
                        Select
                    </option>

                    <option value="True">
                        True
                    </option>

                    <option value="False">
                        False
                    </option>

                </select>

            )}

            {/* Add Follow Up */}
            <div className="mt-6 flex gap-4 items-center">

                <input
                    type="text"
                    placeholder="Add follow-up question..."
                    value={newQuestion}
                    onChange={(e) =>
                        setNewQuestion(e.target.value)
                    }
                    className="
                        flex-1
                        bg-transparent
                        border-b
                        border-slate-400
                        focus:outline-none
                        focus:border-slate-700
                        py-2
                    "
                />

                <button
                    onClick={() => {

                        if (!newQuestion.trim()) return;

                        handleAddFollowUp(
                            question.id,
                            newQuestion
                        );

                        setNewQuestion('');

                    }}
                    className="
                        text-blue-600
                        hover:text-blue-800
                        hover:underline
                        transition
                        text-sm
                        font-medium
                    "
                >
                    + Add
                </button>

            </div>

            {/* Child Questions */}
            {question.children?.length > 0 && (

                <div className="space-y-4 ml-6 mt-6">

                    {question.children.map((child, index) => (

                        <FormQuestion
                            key={child.id}
                            question={child}
                            numbering={`${numbering}.${index + 1}`}
                            handleAnswer={handleAnswer}
                            handleAddFollowUp={handleAddFollowUp}
                            level={level + 1}
                        />

                    ))}

                </div>

            )}

        </div>

    );
};

const FormPage = () => {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        const saved =
            localStorage.getItem('questions');

        if (saved) {
            setQuestions(JSON.parse(saved));
        }

    }, []);

    // Update Answer
    const updateAnswer = (
        id,
        value,
        items = questions
    ) => {

        return items.map((item) => {

            if (item.id === id) {

                return {
                    ...item,
                    userAnswer: value,
                };
            }

            return {
                ...item,
                children: updateAnswer(
                    id,
                    value,
                    item.children
                ),
            };
        });
    };

    const handleAnswer = (id, value) => {

        const updated =
            updateAnswer(id, value);

        setQuestions(updated);

        localStorage.setItem(
            'questions',
            JSON.stringify(updated)
        );
    };

    // Add Follow Up
    const addFollowUp = (
        parentId,
        questionText,
        items = questions
    ) => {

        return items.map((item) => {

            if (item.id === parentId) {

                const child = {
                    id: Date.now() + Math.random(),
                    text: questionText,
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
                children: addFollowUp(
                    parentId,
                    questionText,
                    item.children
                ),
            };
        });
    };

    const handleAddFollowUp = (
        parentId,
        questionText
    ) => {

        const updated = addFollowUp(
            parentId,
            questionText
        );

        setQuestions(updated);

        localStorage.setItem(
            'questions',
            JSON.stringify(updated)
        );
    };

    return (

        <div className="bg-slate-200 min-h-screen pt-20">

            <Sidebar />

            <div className="p-10">

                {/* A4 SHEET */}
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

                    {/* Header */}
                    <div className="mb-12">

                        <h1 className="text-4xl font-semibold text-slate-800 tracking-tight">
                            User Form
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Answer questions and add follow-ups
                        </p>

                    </div>

                    {/* Questions */}
                    <div className="space-y-6">

                        {questions.length === 0 ? (

                            <div className="text-slate-500">
                                No questions available.
                            </div>

                        ) : (

                            questions.map((question, index) => (

                                <FormQuestion
                                    key={question.id}
                                    question={question}
                                    numbering={`Q${index + 1}`}
                                    handleAnswer={handleAnswer}
                                    handleAddFollowUp={handleAddFollowUp}
                                    level={0}
                                />

                            ))

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default FormPage;