import React from 'react';

const BlogPage = () => {
    return (
        <div className="pt-24 min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-grow w-full h-full">
                <iframe
                    src="https://community.myfunlasvegas.com/index.php/lasvegas-column/"
                    className="w-full h-[calc(100vh-6rem)] border-none"
                    title="Las Vegas Column"
                />
            </div>
        </div>
    );
};

export default BlogPage;
