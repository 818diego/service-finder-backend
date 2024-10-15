import React from "react";

const AboutPage: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg transition-colors duration-300 ease-in-out">
            <div className="px-4 py-5 sm:px-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Welcome to About Us
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
                    This is the about page for the services finder app.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
