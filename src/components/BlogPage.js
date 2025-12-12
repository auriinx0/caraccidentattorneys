import React from 'react';
import { BLOG_POSTS } from '../constants';
import { Calendar, ChevronRight } from 'lucide-react';

const BlogPage = () => {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                        Latest <span className="text-red-700">Legal Insights</span>
                    </h1>
                    <div className="h-1 w-24 bg-red-700 mx-auto rounded-full mb-8"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Stay informed with the latest news, legal tips, and updates from our expert team.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
                            <div className="p-8 flex-grow flex flex-col">
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <Calendar className="w-4 h-4 mr-2 text-red-700" />
                                    {post.date}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-red-700 transition-colors">
                                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                                        {post.title}
                                    </a>
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto pt-6 border-t border-gray-100">
                                    <a
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-red-700 font-bold uppercase text-sm tracking-wider hover:text-red-800 transition-colors"
                                    >
                                        Read Article <ChevronRight className="w-4 h-4 ml-1" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
