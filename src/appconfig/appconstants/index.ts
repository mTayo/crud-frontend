
export const APIROUTES = {
    CREATE_ACCOUNT: 'auth/register',
    LOGIN: 'auth/login',
    CURRENT_USER: 'auth/user',

    // TASKS
    ALL_TASKS: 'task',
    CREATE_TASK: 'task',
    EDIT_TASK: 'task',
    TASK_REPORT: 'task/metrics',

};


export const TASK_STATUS_OPTIONS = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Done', value: 'DONE' },
];
