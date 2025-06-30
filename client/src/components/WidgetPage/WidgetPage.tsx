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

  return (
    <div>
      <div className="button-container">
        <button onClick={handleAddWidget}>Add widget</button>
      </div>
      <div className="widgets-container">
        {!!loading && <p>Loading widgets...</p>}
        {!!error && <p>Error loading widgets.</p>}
        {!!addWidget && (
          <Widget
            widget={null}
            addWidget={addWidget}
            handleRefetch={handleRefetch}
            setAddWidget={setAddWidget}
          />
        )}
        {widgets.length === 0 ? (
          <></>
        ) : (
          <>
            {widgets.map((widget: WidgetType) => (
              <Widget
                widget={widget}
                addWidget={false}
                handleRefetch={handleRefetch}
                setAddWidget={setAddWidget}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default WidgetPage;
