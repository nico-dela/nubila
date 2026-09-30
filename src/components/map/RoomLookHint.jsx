const RoomLookHint = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="room-look-hint" aria-live="polite">
      <p>Arrastrá para mirar · Tocá un objeto del cuarto</p>
    </div>
  );
};

export default RoomLookHint;
