// BackendStatus.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/api_instance";

interface BackendStatusProps {
  // No need to receive isBackendUp as a prop
}

const BackendStatus: React.FC<BackendStatusProps> = () => {
  const [isBackendUp, setIsBackendUp] = useState(true);

  const checkBackendHealth = async () => {
    try {
      await axiosInstance.get("/api/health");
      console.log("Backend is healthy");
      setIsBackendUp(true);
    } catch (error) {
      console.log("Backend is not responding");
      setIsBackendUp(false);
    }
  };

  useEffect(() => {
    // Perform health check when the component mounts
    checkBackendHealth();
  }, []);

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