/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RootState } from 'appconfig/redux-store';
import { useAppSelector } from 'appconfig/redux-store/hooks';
import React, { useEffect, useReducer } from 'react';
import { TaskServiceApi } from 'services/task.service';
import { formatDate, formatFilterDate, truncateMultilineText } from 'utils';
import TaskFilters from './TaskFilter';
import StatusDropdown from 'components/TaskDropDown';
import StatusBadge from 'components/common/StatusBadge';
import TaskModal from './TaskModal';
import { successToast } from 'components/common/Toast';
import Button from 'components/common/Button';

type Task = {
    id: string | number;
    title: string;
    description: string;
    status: string;
    createdAt: string | Date;
    extras?: {
        dueDate?: string | Date;
        [key: string]: any;
    };
    [key: string]: any;
};

type InitialState = {
    allTasks: Task[];
    isLoading: boolean;
    isTaskModalOpen: boolean;
    editTask: Task | null;
};

const Home = () => {
    const { taskReport } = useAppSelector((state: RootState) => state.global);

    const initialState: InitialState = {
        allTasks: [],
        isLoading: false,
        isTaskModalOpen: false,
        editTask: null
    };

    const [state, setState]: [InitialState, React.Dispatch<Partial<InitialState>>] = useReducer(
        (state: InitialState, newState: Partial<InitialState>) => ({ ...state, ...newState }),
        initialState
    );
    const { allTasks,  editTask, isTaskModalOpen } = state;

    const fetchData = async (filters = {}) => {
        try {
            const allTasks = await TaskServiceApi.fetchTasks(filters);
            setState({ allTasks: allTasks.data.data || [], isLoading: false });
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleSubmit = async (formData: Partial<Task>) => {
        try {
           const payload = {
              title: formData.title,
              description: formData.description,
              status: formData.status,
              extras: {
                dueDate: formData.dueDate || null, // store as ISO string in extras
              },
            };
            if (editTask) {
                const updatedTask: any = await TaskServiceApi.editTask(editTask.id, payload);
                const updatedTasks = allTasks.map((task) => (String(task.id) === String(editTask.id) ? updatedTask?.data?.data : task));
                setState({ allTasks: updatedTasks, isTaskModalOpen: false, editTask: null });
                successToast('Task updated successfully');
            } else {
                const createTask: any = await TaskServiceApi.createTask(payload);
                // add new task to list
                const newTasks = [...allTasks];
                newTasks.push(createTask?.data?.data);
                setState({ allTasks: newTasks, isTaskModalOpen: false, editTask: null });
                successToast('Task created successfully');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilterChange = (filters: { dueDate?: Date | null; createdAt?: Date | null; status?: string }) => {
        const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== null && value !== undefined && (typeof value !== 'string' || value.trim() !== '')) {
                if (value instanceof Date) {
                    acc[key as keyof typeof filters] = formatFilterDate(value);
                } else {
                    acc[key as keyof typeof filters] = value;
                }
            }
            return acc;
        }, {} as { [key: string]: string });
        fetchData(cleanedFilters);
    };

    const handleEditClick = (task: Task) => {
        setState({ isTaskModalOpen: true, editTask: {...task, dueDate: task?.extras?.dueDate || null} });
    };

    const handleStatusChange = async (taskId: string, newStatus: 'PENDING' | 'IN_PROGRESS' | 'DONE') => {
        try {
            const updatedTask = await TaskServiceApi.changeTaskStatus(taskId, newStatus);
            const updatedTasks = allTasks.map((task) => (String(task.id) === String(taskId) ? updatedTask?.data?.data : task));
            setState({ allTasks: updatedTasks });
            successToast('Task status updated successfully');
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

  const handleDeleteTask = async (taskId: number|string) => {
    const confirm = window.confirm('Are you sure you want to delete this task?');
    if (!confirm) return;

    try {
      await TaskServiceApi.deleteTask(taskId);
      const newTasks = allTasks.filter((task) => String(task.id) !== String(taskId));
      setState({ allTasks: newTasks });
      successToast('Task deleted successfully');
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className=" max-w-[1200px] mx-auto">
            <h2 className="mb-4 mt-5 font-bold text-3xl text-opacity-25">Dashboard</h2>

            <div className=" grid grid-cols-12 gap-x-8 gap-y-6">
                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                    <div className="border bg-[#1f1f1f] border-[#6e7681] p-3 rounded-md shadow-sm">
                        <div className="text-[13px] font-bold">Total tasks</div>
                        <div className="text-lg font-bold">{taskReport.total || 0}</div>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                    <div className="border bg-[#1f1f1f] border-[#6e7681] p-3 rounded-md shadow-sm">
                        <div className="text-[13px] font-bold">Pending tasks</div>
                        <div className="text-lg font-bold">{taskReport.pending || 0}</div>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                    <div className="border bg-[#1f1f1f] border-[#6e7681] p-3 rounded-md shadow-sm">
                        <div className="text-[13px] font-bold">Inprogress tasks</div>
                        <div className="text-lg font-bold">{taskReport.inProgress || 0}</div>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                    <div className="border bg-[#1f1f1f] border-[#6e7681] p-3 rounded-md shadow-sm">
                        <div className="text-[13px] font-bold">Completed tasks</div>
                        <div className="text-lg font-bold">{taskReport.done || 0}</div>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex justify-between items-end mb-4">
                <div className="">
                    <Button
                        text="Create Task"
                        className="bg-green-600 text-white text-sm py-2 px-4 rounded hover:bg-green-500"
                        action={() => setState({ isTaskModalOpen: true, editTask: null })}
                    />
                    
                </div>
                <TaskFilters onChange={handleFilterChange} />
            </div>

            <div className=" relative rounded-xl border border-gray-200 shadow-md ">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-700">
                    <thead className=" text-white ">
                        <tr>
                            <th className="px-4 py-3 font-bold">ID</th>
                            <th className="px-4 py-3 font-bold">Title</th>
                            <th className="px-4 py-3 font-bold">Description</th>
                            <th className="px-4 py-3 font-bold">Status</th>
                            <th className="px-4 py-3 font-bold">Created at</th>
                            <th className="px-4 py-3 font-bold">Due date</th>
                            <th className="px-4 py-3 font-bold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-white">
                        {allTasks.map((task) => (
                            <tr key={task.id}>
                                <td className="px-4 py-2 font-mono text-xs text-gray-500">{task.id}</td>
                                <td className="px-4 py-2">{task.title}</td>
                                <td className="px-4 py-2">{truncateMultilineText(task.description, 25)}</td>
                                <td className="px-4 py-2">
                                    <StatusBadge
                                        status={
                                            task.status === 'PENDING' || task.status === 'IN_PROGRESS' || task.status === 'DONE'
                                                ? task.status
                                                : 'PENDING'
                                        }
                                    />
                                </td>
                                <td className="px-4 py-2">{formatDate(String(task?.createdAt))}</td>
                                <td className="px-4 py-2">{task?.extras?.dueDate ? formatDate(String(task?.extras?.dueDate)) : null}</td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-x-3  items-center">
                                        <span className="cursor-pointer hover:underline" onClick={() => handleEditClick(task)}>
                                            Edit
                                        </span>
                                        <span className="cursor-pointer hover:underline" onClick={() => handleDeleteTask(task?.id)}>Delete</span>
                                        <StatusDropdown
                                            value={task.status}
                                            onChange={(newStatus) =>
                                                handleStatusChange(String(task.id), newStatus as 'PENDING' | 'IN_PROGRESS' | 'DONE')
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isTaskModalOpen && (
              <TaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setState({ isTaskModalOpen: false })}
                onSubmit={handleSubmit}
                initialTask={editTask}
            />
            )}
            
        </div>
    );
};
export default React.memo(Home);