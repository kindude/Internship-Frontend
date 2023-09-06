import axiosInstance from "../api/api_instance";

export const handleExport = async (url:string, exportFormat:string, fileName:string) => {
    try {
      const response = await axiosInstance.get(url);
  
      if (exportFormat === 'json') {
        const blob = new Blob([JSON.stringify(response.data)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else if (exportFormat === 'csv') {
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };