// BackendStatus.tsx
import React from "react";

interface BackendStatusProps {
  isBackendUp: boolean;
}

const BackendStatus: React.FC<BackendStatusProps> = ({ isBackendUp }) => {
  return (
    <div>
      {isBackendUp ? (
        <h1>Backend is healthy</h1>
      ) : (
        <h1>Backend is not responding</h1>
      )}
    </div>
  );
};

export default BackendStatus;