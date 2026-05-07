import React from 'react';
import {
    Trash2,
    Plus,
} from 'lucide-react';

const QuestionItem = ({
    question,
    numbering,
    onUpdate,
    onDelete,
    onAddChild,
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
                transition-all
            `}
        >

            <div className="flex items-center gap-3 mb-5">

                <span className="font-bold text-slate-700">
                    {numbering}
                </span>

                <input
                    type="text"
                    placeholder="Enter Question"
                    value={question.text}
                    onChange={(e) =>
                        onUpdate(question.id, {
                            text: e.target.value,
                        })
                    }
                    className="
                        flex-1
                        bg-transparent
                        border-b
                        border-slate-400
                        focus:outline-none
                        focus:border-slate-700
                        py-1
                    "
                />

            </div>

            <div className="flex items-center gap-6 mb-5">

                <select
                    value={question.type}
                    onChange={(e) =>
                        onUpdate(question.id, {
                            type: e.target.value,
                            answer: '',
                        })
                    }
                    className="
                        bg-transparent
                        border-b
                        border-slate-400
                        focus:outline-none
                        py-1
                    "
                >
                    <option>Short Answer</option>
                    <option>True/False</option>
                </select>

                {question.type === 'True/False' && (

                    <select
                        value={question.answer}
                        onChange={(e) =>
                            onUpdate(question.id, {
                                answer: e.target.value,
                            })
                        }
                        className="
                            bg-transparent
                            border-b
                            border-slate-400
                            focus:outline-none
                            py-1
                        "
                    >
                        <option value="">Select Answer</option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>

                )}

            </div>

            <div className="flex gap-6 text-sm mb-6">

                <button
                    onClick={() => onAddChild(question.id)}
                    className="
                        text-blue-600
                        hover:text-blue-800
                        hover:underline
                        transition
                        flex
                        items-center
                        gap-1
                    "
                >
                    <Plus size={16} />
                    Add Child
                </button>

                <button
                    onClick={() => onDelete(question.id)}
                    className="
                        text-red-500
                        hover:text-red-700
                        hover:underline
                        transition
                        flex
                        items-center
                        gap-1
                    "
                >
                    <Trash2 size={16} />
                    Delete
                </button>

            </div>

            {question.children.length > 0 && (

                <div className="space-y-4 ml-6">

                    {question.children.map((child, index) => (

                        <QuestionItem
                            key={child.id}
                            question={child}
                            numbering={`${numbering}.${index + 1}`}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            onAddChild={onAddChild}
                            level={level + 1}
                        />

                    ))}

                </div>

            )}

        </div>
    );
};

export default QuestionItem;