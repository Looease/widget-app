import { useState } from "react";
import { useGetWidgets } from "../../hooks/useGetWidgets/useGetWidgets";
import Widget from "../Widget";

import "./WidgetPage.css";
import type { WidgetType } from "../../requests/getWidgets/getWidgets.types";

const WidgetPage = () => {
  const [addWidget, setAddWidget] = useState(false);

  const handleAddWidget = () => {
    setAddWidget(true);
  };

  const { data, loading, error, refetchWidgets } = useGetWidgets() || {};

  const { widgets = [] } = data || {};

  const handleRefetch = refetchWidgets;

  if (loading) {
    return <p>Loading widgets...</p>;
  }

  if (error) {
    return <p>Error loading widgets.</p>;
  }

  return (
    <div>
      <div className="button-container">
        <button onClick={handleAddWidget}>Add widget</button>
      </div>
      {(!widgets || widgets.length === 0) && !addWidget && (
        <p className="no-widgets">No widgets added. Add one to get started.</p>
      )}
      <div className="widgets-container">
        {!!addWidget && (
          <Widget
            widget={null}
            addWidget={addWidget}
            handleRefetch={handleRefetch}
            setAddWidget={setAddWidget}
          />
        )}
        {widgets.length > 0 &&
          widgets.map((widget: WidgetType, index: number) => (
            <Widget
              widget={widget}
              addWidget={false}
              handleRefetch={handleRefetch}
              setAddWidget={setAddWidget}
              key={`${widget.id}-${index}`}
            />
          ))}
      </div>
    </div>
  );
};

export default WidgetPage;
