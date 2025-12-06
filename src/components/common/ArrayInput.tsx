import React, {useState} from 'react';
import {Label} from '@/components/ui/label.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Badge} from '@/components/ui/badge.tsx';
import {X, Plus} from 'lucide-react';
import {FieldError, Merge} from "react-hook-form";

interface Props {
    value: string[];
    onChange: (newValue: string[]) => void;
    label?: string;
    placeholder?: string;
    type: "editable" | "uneditable";
    error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}

const ArrayInput: React.FC<Props> = ({
                                         value,
                                         onChange,
                                         label,
                                         placeholder,
                                         type,
                                         error
                                     }) => {
    const [newValue, setNewValue] = useState('');

    const addField = () => {
        if (newValue.trim()) {
            const updatedValues = [...value, newValue.trim()];
            onChange(updatedValues);
            setNewValue('');
        }
    };

    const removeField = (index: number) => {
        const updatedValues = value.filter((_, i) => i !== index);
        onChange(updatedValues);
    };

    const updateField = (index: number, newValue: string) => {
        const updatedValues = [...value];
        updatedValues[index] = newValue;
        onChange(updatedValues);
    };


    const ErrorMessage = () => {
        if (!error) return null;
        return <p className="text-red-500 text-sm mt-1">{error.message}</p>;
    };

    // Helper cho lỗi mảng phức tạp
    const ComplexArrayErrorMessage = () => {
        if (!error) return null;

        if (error.message) { // Lỗi trên chính mảng
            return <p className="text-red-500 text-sm mt-1">{error.message}</p>;
        }
        // Nếu là mảng các đối tượng, lỗi có thể lồng nhau
        if (Array.isArray(error)) {
            return (
                <>
                    {error.map((itemError, index) => (
                        itemError && Object.keys(itemError).map(key => (
                            <p key={`${index}-${key}`} className="text-red-500 text-sm mt-1">
                                {`${label}[${index}].${key}: ${(itemError as any)[key]?.message}`}
                            </p>
                        ))
                    ))}
                </>
            );
        }
        return null;
    };

    return (
        <div>
            <Label>{label}</Label>
            {type === "uneditable" ? <>
                <div className="flex flex-wrap gap-2 mb-2">
                    {value?.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {amenity}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeField(index)}/>
                        </Badge>
                    ))}
                </div>
                <ErrorMessage/>
                <div className="flex gap-2">
                    <Input
                        placeholder={placeholder}
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        onKeyUp={(e) => e.key === 'Enter' && addField()}
                    />
                    <Button type="button" onClick={addField} size="sm">
                        <Plus className="h-4 w-4"/>
                    </Button>
                </div>
            </> : <>
                <div className="space-y-2 mb-2">
                    {value?.map((image, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input
                                value={image}
                                onChange={(e) => updateField(index, e.target.value)}
                                className={error?.[index] ? 'border-red-500' : ''}
                                placeholder={placeholder}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeField(index)}
                            >
                                <X className="h-4 w-4"/>
                            </Button>
                        </div>
                    ))}
                </div>
                <ComplexArrayErrorMessage/>
                <div className="flex gap-2">
                    <Input
                        placeholder={placeholder}
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        onKeyUp={(e) => e.key === 'Enter' && addField()}
                    />
                    <Button type="button" onClick={addField} size="sm">
                        <Plus className="h-4 w-4"/>
                    </Button>
                </div>
            </>}


        </div>
    );
};

export default ArrayInput;