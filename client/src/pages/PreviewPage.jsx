import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const PreviewQuestion = ({
    question,
    numbering,
    level,
}) => {

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
            `}
        >

            {/* Question */}
            <div className="flex gap-3 mb-4">

                <span className="font-bold text-slate-700">
                    {numbering}
                </span>

                <p className="text-slate-800 flex-1">
                    {question.text}
                </p>

            </div>

            {/* Answer Preview */}
            <div className="ml-6 mb-4">

                {question.type === 'Short Answer' ? (

                    <div
                        className="
                            border-b
                            border-slate-400
                            min-h-[35px]
                            py-2
                            text-slate-700
                        "
                    >
                        {question.userAnswer || (
                            <span className="text-slate-400">
                                No answer provided
                            </span>
                        )}
                    </div>

                ) : (

                    <div className="flex gap-8">

                        <div
                            className={`
                                border-b
                                pb-1
                                ${question.userAnswer === 'True'
                                    ? 'border-green-600 text-green-700 font-medium'
                                    : 'border-slate-300 text-slate-400'
                                }
                            `}
                        >
                            True
                        </div>

                        <div
                            className={`
                                border-b
                                pb-1
                                ${question.userAnswer === 'False'
                                    ? 'border-red-600 text-red-700 font-medium'
                                    : 'border-slate-300 text-slate-400'
                                }
                            `}
                        >
                            False
                        </div>

                    </div>

                )}

            </div>

            {/* Children */}
            {question.children?.length > 0 && (

                <div className="space-y-4 ml-6 mt-6">

                    {question.children.map((child, index) => (

                        <PreviewQuestion
                            key={child.id}
                            question={child}
                            numbering={`${numbering}.${index + 1}`}
                            level={level + 1}
                        />

                    ))}

                </div>

            )}

        </div>

    );
};

const PreviewPage = () => {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        const saved =
            localStorage.getItem('questions');

        if (saved) {
            setQuestions(JSON.parse(saved));
        }

    }, []);

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
                            Form Preview
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Printable A4 preview with user answers
                        </p>

                    </div>

                    {/* Questions */}
                    <div className="space-y-6">

                        {questions.length === 0 ? (

                            <div className="text-slate-500">
                                No Questions Available
                            </div>

                        ) : (

                            questions.map((question, index) => (

                                <PreviewQuestion
                                    key={question.id}
                                    question={question}
                                    numbering={`Q${index + 1}`}
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

export default PreviewPage;