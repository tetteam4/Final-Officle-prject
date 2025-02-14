export const fetchServiceCategories = async () => {
  const response = await fetch("http://127.0.0.1:8000/api/services-category/");
  return response.json();
};
