import { APIROUTES } from 'appconfig/appconstants';
import { ApiRequestClient } from './abstract.service';

/**
 * TaskService
 */
class TaskService {
    
    fetchReports = async () =>
        ApiRequestClient.get(APIROUTES.TASK_REPORT);

    createTask = async (payload: unknown) =>
        ApiRequestClient.post(APIROUTES.CREATE_TASK, payload);

    editTask = async (taskId: string|number, payload: unknown) =>
        ApiRequestClient.put(`${APIROUTES.EDIT_TASK}/${taskId}`, payload);

    fetchTasks = async (params: Record<string, unknown>) =>
        ApiRequestClient.get(APIROUTES.ALL_TASKS, params);

    deleteTask = async (taskId: string|number) =>
        ApiRequestClient.delete(`${APIROUTES.EDIT_TASK}/${taskId}`);

    changeTaskStatus = async (taskId: string, status: 'PENDING' | 'IN_PROGRESS' | 'DONE') =>
        ApiRequestClient.put(`${APIROUTES.ALL_TASKS}/${taskId}/status`, { status });
}

export const TaskServiceApi = new TaskService();
