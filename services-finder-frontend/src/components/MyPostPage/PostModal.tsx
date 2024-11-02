import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";

interface ModalPostProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "edit" | "delete";
    onSubmit: (data: {
        title?: string;
        description?: string;
        images?: string[];
    }) => void;
    initialData?: { title: string; description: string; images?: string[] };
    postId?: string;
}

const isValidUrl = (url: string) => {
    const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" +
            "((([a-zA-Z0-9_-]+)\\.)+[a-zA-Z]{2,})" +
            "(\\/[a-zA-Z0-9@:%_+.~#?&//=]*)?"
    );
    return urlPattern.test(url);
};

const ModalPost: React.FC<ModalPostProps> = ({
    isOpen,
    onClose,
    mode,
    onSubmit,
    initialData,
}) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(
        initialData?.description || ""
    );
    const [imageUrls, setImageUrls] = useState<string[]>(
        initialData?.images || [""]
    );

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setImageUrls(initialData.images || [""]);
        } else if (mode === "delete") {
            setTitle("");
            setDescription("");
            setImageUrls([""]);
        }
    }, [initialData, mode]);

    const handleAddImageUrl = () => {
        setImageUrls([...imageUrls, ""]);
    };

    const handleImageUrlChange = (index: number, url: string) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = url;
        setImageUrls(newImageUrls);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Title is required.");
            return;
        }

        if (!description.trim()) {
            toast.error("Description is required.");
            return;
        }

        const validUrls = imageUrls.filter(
            (url) => url.trim() !== "" && isValidUrl(url)
        );
        if (validUrls.length === 0) {
            toast.error("At least one valid image URL is required.");
            return;
        }

        onSubmit({
            title,
            description,
            images: validUrls,
        });
        onClose();
    };

    const handleDelete = () => {
        onSubmit({});
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <motion.div
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                        }}>
                        {mode === "delete" ? (
                            <>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    Confirm Delete
                                </h2>
                                <p className="mt-4 text-gray-600 dark:text-gray-300">
                                    Are you sure you want to delete this post?
                                </p>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500">
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500">
                                        Delete
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    Edit Post
                                </h2>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4 mt-4">
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        placeholder="Title"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                    <textarea
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        placeholder="Description"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                    {imageUrls.map((url, index) => (
                                        <div key={index} className="space-y-2">
                                            <input
                                                type="text"
                                                value={url}
                                                onChange={(e) =>
                                                    handleImageUrlChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={`Image URL ${
                                                    index + 1
                                                }`}
                                                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                    ))}
                                    <div className="flex justify-center mt-2">
                                        <button
                                            type="button"
                                            onClick={handleAddImageUrl}
                                            className="flex justify-center items-center bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-400 transition-all duration-300 transform hover:scale-105 w-8 h-8">
                                            <FaPlus />
                                        </button>
                                    </div>
                                    <div className="flex justify-end space-x-2 mt-4">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500">
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalPost;
