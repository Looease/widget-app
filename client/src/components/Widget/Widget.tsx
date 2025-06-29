import { useState, type SetStateAction } from "react";
import { useCreateWidget } from "../../hooks/useCreateWidget/useCreateWidget";
import { useDeleteWidget } from "../../hooks/useDeleteWidget/useDeleteWidget";

import "./Widget.css";

export const Widget = ({
  widget,
  addWidget,
  handleRefetch,
  setAddWidget
}: {
  widget: any | null;
  addWidget: boolean;
  handleRefetch: () => void;
  setAddWidget: (state: boolean) => void;
}) => {
  const [content, setContent] = useState("");

  const {
    createWidget,
    loading: creatingWidget,
    error: createWidgetError,
  } = useCreateWidget();

  const { deleteItem: deleteWidget } = useDeleteWidget();

  const handleSubmit = async () => {
    if(!creatingWidget){
      setAddWidget(false);
      setContent('');
    }
    try {
      await createWidget(content);
      handleRefetch();
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setContent(e.target.value);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteWidget(id);
      handleRefetch();
    } catch (e) {
      console.error("Error deleting widget:", e);
    }
  };

  return (
    <>
      {!!addWidget ? (
        <section className="container">
          <div className="innerWidget">
            <label htmlFor="widget-content">Create</label>
            <input
              className="textInput"
              id="widget-content"
              type="textarea"
              onChange={handleChange}
              value={content}
            />
            <button onClick={handleSubmit}>Submit widget</button>
          </div>
        </section>
      ) : (
        <section className="container">
          <div className="innerWidget">
            <p>{widget.content}</p>
            <button onClick={() => handleDelete(widget.id)}>Delete</button>
          </div>
        </section>
      )}
    </>
  );
};

export default Widget;
