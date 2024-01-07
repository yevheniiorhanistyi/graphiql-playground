import { vi, describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/components/Input/Input';

const submitFormMock = vi.fn();

type FormData = {
  username: string;
};

type TestComponentProps = {
  errors: string;
};

const TestComponent = ({ errors }: TestComponentProps) => {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    submitFormMock(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input register={register} label="Username" name="username" type="text" errors={errors} />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('Input component', () => {
  test('renders input with label and handles user input', async () => {
    render(<TestComponent errors="" />);

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();

    await userEvent.type(inputElement, 'john.doe');

    expect(inputElement.value).toBe('john.doe');

    await userEvent.click(screen.getByText('Submit'));

    expect(submitFormMock).toHaveBeenCalledWith({ username: 'john.doe' });
  });

  test('render error', async () => {
    render(<TestComponent errors={'Test'} />);

    const errorText = screen.getByText('Test');

    expect(errorText).toBeInTheDocument();
  });
});
