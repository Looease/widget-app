import { useState, useEffect } from "react";
import { useCreateWidget } from "../../hooks/useCreateWidget/useCreateWidget";
import { useDeleteWidget } from "../../hooks/useDeleteWidget/useDeleteWidget";
import type { WidgetType } from "../../requests/getWidgets/getWidgets.types";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import "./Widget.css";

export const Widget = ({
  widget,
  addWidget,
  handleRefetch,
  setAddWidget,
}: {
  widget: WidgetType | null;
  addWidget: boolean;
  handleRefetch: () => void;
  setAddWidget: (state: boolean) => void;
}) => {
  const [content, setContent] = useState("");

  const {
    createNeWidget,
    loading: creatingWidget,
    error: createWidgetError,
  } = useCreateWidget();

  const { deleteItem: deleteWidget } = useDeleteWidget();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setContent(value);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteWidget(id);
      handleRefetch();
    } catch (e) {
      console.error("Error deleting widget:", e);
    }
  };

  const searchQuery = useDebounce(content, 2000);

  useEffect(() => {
    const createWidget = async () => {
      if (!creatingWidget) {
        setAddWidget(false);
        setContent("");
      }
      try {
        await createNeWidget(content);
        handleRefetch();
      } catch (e) {
        console.error("Error:", e);
      }
    };

    if (searchQuery || content.length < 0) createWidget();
  }, [searchQuery]);

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
          </div>
          <div className="cancel-button-container">
            <button
              className="cancel-button"
              onClick={() => setAddWidget(false)}
            >
              &times;
            </button>
          </div>
        </section>
      ) : (
        <section className="container">
          <div className="innerWidget">
            {!!widget && (
              <>
                <p>{widget.content}</p>
                <button onClick={() => handleDelete(widget.id)}>Delete</button>
              </>
            )}
          </div>
        </section>
      )}
      {!!createWidgetError && (
        <section className="container">
          <div className="innerWidget">
            <p>Create widget error. Please delete this one and try again.</p>
          </div>
        </section>
      )}
    </>
  );
};

export default Widget;
