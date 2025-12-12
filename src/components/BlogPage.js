import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { Calendar, ChevronRight } from 'lucide-react';
import Modal from './Modal';

const BlogPage = () => {
    const [activeTab, setActiveTab] = useState('insights'); // 'insights' or 'myfun'
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <div className="pt-32 pb-24 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                        Latest <span className="text-red-700">Legal Insights</span>
                    </h1>
                    <div className="h-1 w-24 bg-red-700 mx-auto rounded-full mb-8"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Stay informed with the latest news, legal tips, and updates from our expert team.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1 rounded-full shadow-lg border border-gray-100 flex">
                        <button
                            onClick={() => setActiveTab('insights')}
                            className={`px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 ${activeTab === 'insights' ? 'bg-red-700 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Latest Insights
                        </button>
                        <button
                            onClick={() => setActiveTab('myfun')}
                            className={`px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 ${activeTab === 'myfun' ? 'bg-red-700 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            My Fun Las Vegas
                        </button>
                    </div>
                </div>

                {/* Content */}
                {activeTab === 'insights' ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                        {BLOG_POSTS.map((post, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <Calendar className="w-4 h-4 mr-2 text-red-700" />
                                        {post.date}
                                    </div>
                                    <h3
                                        className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-red-700 transition-colors cursor-pointer"
                                        onClick={() => setSelectedPost(post)}
                                    >
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-gray-100">
                                        <button
                                            onClick={() => setSelectedPost(post)}
                                            className="inline-flex items-center text-red-700 font-bold uppercase text-sm tracking-wider hover:text-red-800 transition-colors"
                                        >
                                            Read Article <ChevronRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full h-[calc(100vh-24rem)] min-h-[600px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in">
                        <iframe
                            src="https://community.myfunlasvegas.com/index.php/lasvegas-column/"
                            className="w-full h-full border-none"
                            title="My Fun Las Vegas"
                        />
                    </div>
                )}
            </div>

            {/* Read More Modal */}
            <Modal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)} maxWidth="max-w-7xl">
                {selectedPost && (
                    <div className="bg-white">
                        {/* Sticky Header */}
                        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-8 py-6 border-b border-gray-100 mb-8">
                            <span className="text-red-700 font-bold uppercase tracking-widest text-xs mb-2 block">{selectedPost.date}</span>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-tight">{selectedPost.title}</h2>
                        </div>

                        {/* Scrollable Content */}
                        <div className="px-8 pb-12">
                            <div
                                className="prose prose-xl prose-red max-w-none text-gray-700 leading-relaxed prose-headings:font-serif prose-headings:font-bold prose-p:mb-6"
                                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default BlogPage;
