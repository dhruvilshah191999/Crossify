import React from "react";
import Form, {
  Input,
  TextArea,
  ImageUpload,
  MultiSelect,
  FormActions,
  FormButton,
} from "react-standalone-form";

const BlogPostForm = () => (
  <Form
    fields={["title", "content", "image", "date", "tags"]}
    required={["title", "content"]}
  >
    <Input name="title" label="Title" inlineLabel />
    <TextArea name="content" label="Content" inlineLabel />
    <ImageUpload name="image" label="Featured image" inlineLabel />
    <Input name="date" type="date" label="Publication date" inlineLabel />
    <MultiSelect
      name="tags"
      label="Categories"
      options={["Lifestyle", "Nature", "Technology"]}
      inlineLabel
    />
    <FormActions>
      <FormButton reset>Reset</FormButton>
      <FormButton callback={(fields) => console.log(fields)}>Submit</FormButton>
    </FormActions>
  </Form>
);

export default BlogPostForm;
