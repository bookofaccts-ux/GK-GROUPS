import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

interface AdminTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    keyField: keyof T;
}

export function AdminTable<T>({ data, columns, onEdit, onDelete, keyField }: AdminTableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className={`px-6 py-4 font-bold text-slate-700 ${col.className || ''}`}>
                                {col.header}
                            </th>
                        ))}
                        {(onEdit || onDelete) && <th className="px-6 py-4 font-bold text-slate-700 text-right">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="px-6 py-8 text-center text-slate-500">
                                No records found.
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={String(item[keyField])} className="hover:bg-slate-50 transition-colors group">
                                {columns.map((col, idx) => (
                                    <td key={idx} className="px-6 py-4 text-slate-600">
                                        {typeof col.accessor === 'function'
                                            ? col.accessor(item)
                                            : (item[col.accessor] as React.ReactNode)}
                                    </td>
                                ))}
                                {(onEdit || onDelete) && (
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {onEdit && (
                                                <button
                                                    onClick={() => onEdit(item)}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button
                                                    onClick={() => onDelete(item)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
