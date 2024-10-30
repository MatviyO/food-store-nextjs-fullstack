import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { RequiredSymbol } from "@/shared/components/shared/text/required-symbol";
import { ErrorText } from "@/shared/components/shared/text/error-text";
import {
  Select, SelectContent,
  SelectProps,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@radix-ui/react-select";


type SelectItem = {
  value: string;
  label: React.ReactNode;
};

interface Props extends SelectProps {
  label?: string;
  required?: boolean;
  name: string;
  items: Array<SelectItem>;
  placeholder?: string;
}

export const FormSelect: React.FC<Props> = ({
  label,
  required,
  name,
  items,
  placeholder,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errotText = errors?.[name]?.message as string;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <p className="font-medium mb-2">
            {label} {required && <RequiredSymbol />}
          </p>

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            {...props}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errotText && <ErrorText text={errotText} />}
        </div>
      )}
    />
  );
};
