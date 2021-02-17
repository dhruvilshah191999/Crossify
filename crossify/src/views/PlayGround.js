import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";

class MyModal extends Component {
  render() {
    const { text, onRequestClose } = this.props;
    return (
      <Modal onRequestClose={onRequestClose} effect={Effect.RotateFromBottom3D}>
        <div className="p-2">
          <h1>What you input : {text}</h1>
          <button onClick={ModalManager.close}>Close Modal</button>
        </div>
      </Modal>
    );
  }
}

class App extends Component {
  openModal() {
    const text = this.refs.input.value;
    ModalManager.open(<MyModal text={text} onRequestClose={() => true} />);
  }
  render() {
    return (
      <div>
        <div>
          <input type="text" placeholder="input something" ref="input" />
        </div>
        <div>
          <button type="button" onClick={this.openModal.bind(this)}>
            Open Modal{" "}
          </button>{" "}
        </div>
      </div>
    );
  }
}
export default App;
// import React from "react";
// class Test extends React.Component {
//   state = {};
//   render() {
//     return <h2>Hello</h2>;
//   }
// }

// export default Test;

// import Forhellom, {
//   Input,
//   TextArea,
//   ImageUpload,
//   MultiSelect,
//   FormActions,
//   FormButton,
// } from "react-standalone-form";

// const BlogPostForm = () => (
//   <Form
//     fields={["title", "content", "image", "date", "tags"]}
//     required={["title", "content"]}
//   >
//     <Input name="title" label="Title" inlineLabel />
//     <TextArea name="content" label="Content" inlineLabel />
//     <ImageUpload name="image" label="Featured image" inlineLabel />
//     <Input name="date" type="date" label="Publication date" inlineLabel />
//     <MultiSelect
//       name="tags"
//       label="Categories"
//       options={["Lifestyle", "Nature", "Technology"]}
//       inlineLabel
//     />
//     <FormActions>
//       <FormButton reset>Reset</FormButton>
//       <FormButton callback={(fields) => console.log(fields)}>Submit</FormButton>
//     </FormActions>
//   </Form>
// );
// const Masti = () => {
//   return (
//     <>
//       {swal(
//         <div>
//           <h1>Hello world!</h1>
//           <p>This is now rendered with JSX!</p>
//         </div>
//       )}
//     </>
//   );
// };
// import swal from "@sweetalert/with-react";

// export default Masti;
