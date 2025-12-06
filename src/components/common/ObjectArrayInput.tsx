import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Plus } from 'lucide-react';
import {Badge} from "@/components/ui/badge.tsx";

interface FieldConfig<T> {
    key: keyof T;
    label: string;
    placeholder?: string;
}

interface ObjectArrayInputProps<T extends Record<string, string>> {
    value: T[];
    onChange: (newValue: T[]) => void;
    fields: FieldConfig<T>[];
    errors?: Array<{ [key in keyof T]?: boolean | undefined } | undefined>;
    newItemErrors?: { [key in keyof T]?: boolean | undefined };
    label?: string;
    addButtonText?: string;
}

const ObjectArrayInput = <T extends Record<string, string>>({
                                                                value,
                                                                onChange,
                                                                fields,
                                                                errors = [],
                                                                newItemErrors = {},
                                                                label = 'Items',
                                                                addButtonText = 'Add Item',
                                                            }: ObjectArrayInputProps<T>) => {
    const [newItem, setNewItem] = useState<Partial<T>>({});

    const addItem = () => {
        const completeItem = fields.reduce((acc, field) => {
            acc[field.key] = (newItem[field.key] || '').trim() as T[keyof T];
            return acc;
        }, {} as T);

        if (Object.values(completeItem).some((v) => v.trim() !== '')) {
            const updatedItems = [...value, completeItem];
            onChange(updatedItems);
            setNewItem({});
        }
    };

    const removeItem = (index: number) => {
        const updatedItems = value.filter((_, i) => i !== index);
        onChange(updatedItems);
    };

    const updateItem = (index: number, key: keyof T, newVal: string) => {
        const updatedItems = [...value];
        updatedItems[index] = { ...updatedItems[index], [key]: newVal };
        onChange(updatedItems);
    };

    const updateNewItem = (key: keyof T, newVal: string) => {
        setNewItem((prev) => ({ ...prev, [key]: newVal }));
    };

    return (
        <div>
            <Label>{label}</Label>
            <div className="space-y-4 mb-4">
                {value.map((item, index) => (
                    <Card key={index} className="relative">
                        <CardContent className="pt-6">
                            {fields.map((field) => (
                                <div key={field.key as string} className="mb-2">
                                    <Label htmlFor={`${index}`}>{field.label}</Label>
                                    <Input
                                        id={`${index}`}
                                        value={item[field.key] || ''}
                                        onChange={(e) => updateItem(index, field.key, e.target.value)}
                                        placeholder={field.placeholder}
                                        className={errors[index]?.[field.key] ? 'border-red-500' : ''}
                                    />
                                    {errors[index]?.[field.key] && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {`${field.label} is invalid`}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeItem(index)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </Card>
                ))}
            </div>
            <Card>
                <CardContent className="pt-6">
                    <Label className="mb-4"><Badge variant="default">Thêm mới</Badge>  </Label>
                    {fields.map((field) => (
                        <div key={field.key as string} className="mb-2">
                            <Label htmlFor={`new-${field.key as string}`}>{field.label}</Label>
                            <Input
                                id={`new-${field.key as string}`}
                                value={(newItem[field.key] as string) || ''}
                                onChange={(e) => updateNewItem(field.key, e.target.value)}
                                placeholder={field.placeholder}
                                onKeyUp={(e) => e.key === 'Enter' && addItem()}
                                className={newItemErrors[field.key] ? 'border-red-500' : ''}
                            />
                            {newItemErrors[field.key] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {`${field.label} is invalid`}
                                </p>
                            )}
                        </div>
                    ))}
                    <Button type="button" onClick={addItem} className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        {addButtonText}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ObjectArrayInput;