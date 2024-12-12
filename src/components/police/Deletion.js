import React, { useState } from 'react';
import { Trash2, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import CustomCard from '../common/CustomCard';

const Deletion = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            setMessage('Please enter a name');
            setVariant('danger');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://34.192.156.219:5000/delete_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message || 'User data deleted successfully');
                setVariant('success');
                setName('');
            } else {
                setMessage(data.error || 'Error deleting user');
                setVariant('danger');
            }
        } catch (error) {
            setMessage('Error connecting to the server');
            setVariant('danger');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">User Data Deletion</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
                {/* Explanation Card */}
                <CustomCard className="p-6 bg-gray-50">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <AlertTriangle size={24} className="text-yellow-500" />
                            <h3 className="text-xl font-semibold text-gray-800">Important Information</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            When you delete a user's data, all images associated with that name across all reasons will be permanently removed from the system.
                        </p>
                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                            <li>Deletion is case-insensitive</li>
                            <li>All matching files will be completely erased</li>
                            <li>This action cannot be undone</li>
                        </ul>
                        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md flex items-center gap-3">
                            <AlertTriangle size={20} className="text-yellow-600" />
                            <p className="text-yellow-800 text-sm">
                                Please double-check the name before deletion.
                            </p>
                        </div>
                    </div>
                </CustomCard>

                {/* Deletion Form Card */}
                <CustomCard>
                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name to Delete
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter name to delete"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors
                                    ${loading 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-red-500 hover:bg-red-600'
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Deleting...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Trash2 size={20} />
                                        Delete User Data
                                    </span>
                                )}
                            </button>

                            {/* Alert Message */}
                            {message && (
                                <div className={`mt-4 p-4 rounded-md flex items-center gap-2
                                    ${variant === 'success' 
                                        ? 'bg-green-50 text-green-700 border border-green-200' 
                                        : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}
                                >
                                    {variant === 'success' 
                                        ? <CheckCircle2 size={20} className="text-green-500" />
                                        : <AlertCircle size={20} className="text-red-500" />
                                    }
                                    {message}
                                </div>
                            )}
                        </form>
                    </div>
                </CustomCard>
            </div>
        </div>
    );
};

export default Deletion;