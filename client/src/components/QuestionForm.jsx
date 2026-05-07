import React, { useEffect, useState } from 'react';
import QuestionItem from './QuestionItem';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';

const generateId = () => Date.now() + Math.random();

const QuestionForm = () => {
    const [questions, setQuestions] = useState(() => {
        const saved = localStorage.getItem('nestedQuestions');
        return saved ? JSON.parse(saved) : [];
    });

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        localStorage.setItem('nestedQuestions', JSON.stringify(questions));
    }, [questions]);

    const addParentQuestion = () => {
        const newQuestion = {
            id: generateId(),
            text: '',
            type: 'Short Answer',
            answer: '',
            children: [],
        };

        setQuestions([...questions, newQuestion]);
    };

    const updateQuestion = (id, updatedData, items = questions) => {
        return items.map((item) => {
            if (item.id === id) {
                return { ...item, ...updatedData };
            }

            if (item.children.length > 0) {
                return {
                    ...item,
                    children: updateQuestion(id, updatedData, item.children),
                };
            }

            return item;
        });
    };

    const handleUpdate = (id, updatedData) => {
        setQuestions((prev) => updateQuestion(id, updatedData, prev));
    };

    const deleteQuestion = (id, items = questions) => {
        return items
            .filter((item) => item.id !== id)
            .map((item) => ({
                ...item,
                children: deleteQuestion(id, item.children),
            }));
    };

    const handleDelete = (id) => {
        setQuestions((prev) => deleteQuestion(id, prev));
    };

    const addChildQuestion = (parentId, items = questions) => {
        return items.map((item) => {
            if (item.id === parentId) {
                const child = {
                    id: generateId(),
                    text: '',
                    type: 'Short Answer',
                    answer: '',
                    children: [],
                };

                return {
                    ...item,
                    children: [...item.children, child],
                };
            }

            return {
                ...item,
                children: addChildQuestion(parentId, item.children),
            };
        });
    };

    const handleAddChild = (parentId) => {
        setQuestions((prev) => addChildQuestion(parentId, prev));
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(questions);
        const [reordered] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reordered);

        setQuestions(items);
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Nested Dynamic Form
            </h1>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={addParentQuestion}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add New Question
                </button>

                <button
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    Submit Form
                </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="questions">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {questions.map((question, index) => (
                                <Draggable
                                    key={question.id}
                                    draggableId={String(question.id)}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <QuestionItem
                                                question={question}
                                                numbering={`Q${index + 1}`}
                                                onUpdate={handleUpdate}
                                                onDelete={handleDelete}
                                                onAddChild={handleAddChild}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {submitted && (
                <div className="mt-10 border-t pt-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Submitted Questions
                    </h2>

                    <QuestionPreview questions={questions} />
                </div>
            )}
        </div>
    );
};

const QuestionPreview = ({ questions, prefix = 'Q' }) => {
  return (
    <div className="space-y-3">
      {questions.map((q, index) => {
        const number = `${prefix}${index + 1}`;

        return (
          <div key={q.id} className="ml-4">
            <p>
              <span className="font-semibold">{number}</span> - {q.text}
              {' '}({q.type})
            </p>

            {q.children.length > 0 && (
              <QuestionPreview
                questions={q.children}
                prefix={`${number}.`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionForm;