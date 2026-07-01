export async function fetchOsrmRoute<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  // Awaiting the JSON and casting it to our expected generic type
  return (await response.json()) as T;
}