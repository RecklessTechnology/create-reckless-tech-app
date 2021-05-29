const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      
      <div className="box input" onDragStart={(event) => onDragStart(event, 'box')} draggable>
        Box
      </div>

      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'mouseInput')} draggable>
        Mouse Input
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'orbitControls')} draggable>
        Orbit Controls
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
    </aside>
  );
};

export default Sidebar;