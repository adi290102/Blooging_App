import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
// control is responsible jo iss editor ko uss form ya jagah le jayega jahan use hona hai.
export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="block mb-2 text-sm text-gray-700">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="8ouytp84i6okgkkcg3m2jktbnf7xpizwh9cbfq6q4lzi796u"
            initialValue={defaultValue}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family: 'Helvetica', 'Arial', sans-serif; font-size: 14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
