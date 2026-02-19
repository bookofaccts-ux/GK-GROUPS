import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { Save, Plus, Trash2, Layout, Megaphone, Phone } from 'lucide-react';
import type { CMSConfig, FeatureButton } from '../../types';

export function AdminCMS() {
    console.log('AdminCMS mounting');
    const { cmsConfig, setCmsConfig } = useGlobal();
    const [formData, setFormData] = useState<CMSConfig>(cmsConfig);
    const [isDirty, setIsDirty] = useState(false);
    const [activeTab, setActiveTab] = useState<'features' | 'sidebar' | 'contact'>('features');

    useEffect(() => {
        setFormData(cmsConfig);
    }, [cmsConfig]);

    const removeFeature = (id: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter(f => f.id !== id)
        }));
        setIsDirty(true);
    };

    const addFeature = () => {
        const newFeat: FeatureButton = {
            id: Date.now().toString(),
            label: 'New Service',
            icon: 'Star',
            path: '/new-service',
            color: 'bg-slate-600'
        };
        setFormData(prev => ({ ...prev, features: [...prev.features, newFeat] }));
        setIsDirty(true);
    };

    const updateFeature = (id: string, field: keyof FeatureButton, val: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.map(f => f.id === id ? { ...f, [field]: val } : f)
        }));
        setIsDirty(true);
    };

    const handleSave = () => {
        setCmsConfig(formData);
        setIsDirty(false);
        alert('Changes saved successfully!');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">User Home Page CMS</h2>
                    <p className="text-slate-500">Customize the layout and content of the user homepage.</p>
                </div>
                {isDirty && (
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-all animate-bounce"
                    >
                        <Save className="w-5 h-5" /> Save Changes
                    </button>
                )}
            </div>

            {/* Tabs for Sections */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex border-b border-slate-200">
                    <button
                        onClick={() => setActiveTab('features')}
                        className={`flex items-center gap-2 px-6 py-4 font-bold transition-colors ${activeTab === 'features' ? 'bg-slate-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Layout className="w-4 h-4" /> Feature Buttons
                    </button>
                    <button
                        onClick={() => setActiveTab('sidebar')}
                        className={`flex items-center gap-2 px-6 py-4 font-bold transition-colors ${activeTab === 'sidebar' ? 'bg-slate-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Megaphone className="w-4 h-4" /> Sidebar & Ticker
                    </button>
                    <button
                        onClick={() => setActiveTab('contact')}
                        className={`flex items-center gap-2 px-6 py-4 font-bold transition-colors ${activeTab === 'contact' ? 'bg-slate-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Phone className="w-4 h-4" /> Contact Details
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'features' && (
                        <div className="space-y-4">
                            {formData.features.map((feat, idx) => (
                                <div key={feat.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 items-end">
                                    <div className="md:col-span-3">
                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Label</label>
                                        <input
                                            type="text"
                                            value={feat.label}
                                            onChange={(e) => updateFeature(feat.id, 'label', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Path</label>
                                        <input
                                            type="text"
                                            value={feat.path}
                                            onChange={(e) => updateFeature(feat.id, 'path', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Color (Tailwind)</label>
                                        <input
                                            type="text"
                                            value={feat.color}
                                            onChange={(e) => updateFeature(feat.id, 'color', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Icon Name</label>
                                        <input
                                            type="text"
                                            value={feat.icon}
                                            onChange={(e) => updateFeature(feat.id, 'icon', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this feature?')) {
                                                    removeFeature(feat.id);
                                                }
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Remove Feature"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addFeature}
                                className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold hover:border-indigo-500 hover:text-indigo-500 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-5 h-5" /> Add New Feature Button
                            </button>
                        </div>
                    )}

                    {activeTab === 'sidebar' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-slate-800 mb-2">Top Ticker / Marquee</h3>
                                <p className="text-xs text-slate-500 mb-2">Text scrolling at the top of the homepage.</p>
                                <input
                                    type="text"
                                    value={formData.ticker || ''}
                                    onChange={(e) => {
                                        setFormData({ ...formData, ticker: e.target.value });
                                        setIsDirty(true);
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                                    placeholder="Enter ticker text..."
                                />
                            </div>

                            <div className="border-t border-slate-200 pt-6">
                                <h3 className="font-bold text-slate-800 mb-2">Advertising Space</h3>
                                <p className="text-xs text-slate-500 mb-2">Supports Markdown (e.g., ### Title, **bold**)</p>
                                <textarea
                                    value={formData.sidebar.ads}
                                    onChange={(e) => {
                                        setFormData({ ...formData, sidebar: { ...formData.sidebar, ads: e.target.value } });
                                        setIsDirty(true);
                                    }}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                                />
                                <div className="mt-2">
                                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Ad Image/Video URL (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.sidebar.adMediaUrl || ''}
                                        onChange={(e) => {
                                            setFormData({ ...formData, sidebar: { ...formData.sidebar, adMediaUrl: e.target.value } });
                                            setIsDirty(true);
                                        }}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="border-t border-slate-200 pt-6">
                                <h3 className="font-bold text-slate-800 mb-2">Announcements</h3>
                                <p className="text-xs text-slate-500 mb-2">Supports Markdown</p>
                                <textarea
                                    value={formData.sidebar.announcements}
                                    onChange={(e) => {
                                        setFormData({ ...formData, sidebar: { ...formData.sidebar, announcements: e.target.value } });
                                        setIsDirty(true);
                                    }}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Office Address</label>
                                <textarea
                                    value={formData.contact.address}
                                    onChange={(e) => {
                                        setFormData({ ...formData, contact: { ...formData.contact, address: e.target.value } });
                                        setIsDirty(true);
                                    }}
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        value={formData.contact.phone}
                                        onChange={(e) => {
                                            setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } });
                                            setIsDirty(true);
                                        }}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Secondary Phone</label>
                                    <input
                                        type="text"
                                        value={formData.contact.secondaryPhone || ''}
                                        onChange={(e) => {
                                            setFormData({ ...formData, contact: { ...formData.contact, secondaryPhone: e.target.value } });
                                            setIsDirty(true);
                                        }}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.contact.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } });
                                        setIsDirty(true);
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">About Company & Founder</label>
                                <textarea
                                    value={formData.contact.about || ''}
                                    onChange={(e) => {
                                        setFormData({ ...formData, contact: { ...formData.contact, about: e.target.value } });
                                        setIsDirty(true);
                                    }}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Brief history about the company and founder..."
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
