import React, { ChangeEvent } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-github';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';

interface JsonEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onImportFile?: (content: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({label, value, onChange, onImportFile }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const fileContent = e.target?.result as string;
          const parsedJson = JSON.parse(fileContent);
          const beautifiedJson = JSON.stringify(parsedJson, null, 2);
          onImportFile?.(beautifiedJson);
        } catch (error) {
          console.log(error);
          alert('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid JSON file.');
    }
  };

  const handleChange = (newValue: string): void => {
    onChange(newValue);
  };

  const handleImportClick = (): void => {
    const fileInput = document.getElementById('json-editor-file-upload') as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div className="flex flex-col h-[300px]">
      <input
        hidden
        type="file"
        accept=".json"
        id="json-editor-file-upload"
        onChange={handleFileChange}
        className="mb-2"
      />
      <div className='flex justify-between items-center'>
      <Label>{label}</Label>

      {onImportFile && (
        <div className="flex justify-end">
          <Button
            type='button'
            variant="default"
            size="sm"
            onClick={handleImportClick}
            className="mb-2 w-fit"
          >
            Import JSON
          </Button>
        </div>
      )}
      </div>
      <div className="w-full h-full overflow-hidden border border-gray-300 px-2 py-2 rounded">
        <AceEditor
          mode="json"
          theme="github"
          name="json_editor"
          value={value}
          onChange={handleChange}
          setOptions={{
            showGutter: false,
          }}
          style={{
            width: '100%',
            height: '100%',
            padding: '10px',
            overflow: 'auto',
          }}
        />
      </div>
    </div>
  );
};

export default JsonEditor;