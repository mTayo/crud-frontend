/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import FormInput from 'components/common/FormInput';
import FormTextArea from 'components/common/FormTextarea';
import { validateData } from 'helpers/validator';
import { isObjectEmpty } from 'utils';

type Task = {
  id?: number;
  title: string;
  description?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  dueDate?: string; // stored as ISO string (yyyy-mm-dd)
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: Task) => void;
  initialTask?: any | null;
};

export default function TaskModal({ isOpen, onClose, onSubmit, initialTask }: Props) {
  const isEditing = Boolean(initialTask);

  const [form, setForm] = useState<Task>({
    title: '',
    description: '',
    status: 'PENDING',
    dueDate: '',
  });

  const [errors, setErrors] = useState<{title?: string}>({});
  
  useEffect(() => {
    if (initialTask) {
      setForm({
        ...initialTask,
        dueDate: initialTask.dueDate?.split('T')[0] || '',
      });
    } else {
      setForm({
        title: '',
        description: '',
        status: 'PENDING',
        dueDate: '',
      });
    }
  }, [initialTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const rules = {
        title: 'required'
    };
    const messages = {
        'title.required': 'Title is required'
    };

    const validate = await validateData(form, rules, messages);
    console.log(validate, 'validate');
    if (isObjectEmpty(validate)) {
        onSubmit(form);
        // onClose();
    } else {
        setErrors({ ...validate });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full -translate-x-1/2 text-white -translate-y-1/2 bg-[#1f1f1f] p-6 rounded-lg shadow-lg z-50">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              {isEditing ? 'Edit Task' : 'Create Task'}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button>
                <X className="w-5 h-5 cursor-pointer" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <FormInput
                  inputName="title"
                    inputType="text"
                    label="Title"
                    placeholder="Enter task title"
                    value={form.title}
                    required
                    errorMessage={errors.title}
                    showErrorMessage={errors.title ? true : false}
                    onChange={handleChange}
                />
              
            </div>

            <div>
    
                <FormTextArea
                    inputName="description"
                    label="Description"
                    placeholder="Enter task description"
                    value={form.description}
                    errorMessage=""
                    showErrorMessage={false}
                    onChange={handleChange}
                />
            </div>

            <div>
      
               <FormInput
                  inputName="dueDate"
                    inputType="date"
                    label="Due Date"
                    placeholder="Select due date"
                    value={form.dueDate || ''}
                    errorMessage=""
                    showErrorMessage={false}
                    onChange={handleChange}
                />
            </div>

            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded text-sm bg-gray-900 border border-gray-700 text-white"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <Dialog.Close asChild>
                <button type="button" className="px-4 py-1 cursor-pointer  text-sm rounded bg-black-200 hover:bg-black-300">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="px-4 py-2 cursor-pointer rounded-lg text-sm bg-green-600 text-white rounded hover:bg-green-7000"
              >
                {isEditing ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
