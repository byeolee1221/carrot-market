interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  name: string;
}

const FormInput = ({ type, placeholder, required, errors, name }: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="w-full bg-transparent rounded-md h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, i) => (
        <span key={i} className="text-red-500 font-medium">{error}</span>
      ))}
    </div>
  );
};

export default FormInput;
