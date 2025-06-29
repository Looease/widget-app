import { useCallback, useState } from "react";
import { useGetWidgets } from "../../hooks/useGetWidgets/useGetWidgets"
import Widget from '../Widget'

import "./Widget.css";

const WidgetPage = () => {
  const [addWidget, setAddWidget] = useState(false);

  const handleAddWidget = () => {
    setAddWidget(true);
  };

  const { data = [], loading, error, refetchWidgets } = useGetWidgets() || {};

  const { widgets = [] } = data || {};

  const handleRefetch = refetchWidgets;

  return (
    <>
      <button onClick={handleAddWidget}>Add widget</button>

      {!!addWidget && (
        <Widget widget={null} addWidget={addWidget} handleRefetch={handleRefetch} setAddWidget={setAddWidget}/>
      )}

      {widgets.length === 0 ? (
        <></>
      ) : (
        <div className="widgets-grid-container">
          {widgets.map((widget) => (
            <Widget widget={widget} addWidget={addWidget} handleRefetch={handleRefetch} setAddWidget={setAddWidget}/>
          ))}
        </div>
      )}
    </>
  );
};

export default WidgetPage;
