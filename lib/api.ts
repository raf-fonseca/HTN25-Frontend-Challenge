export async function getEvents() {
  const res = await fetch("https://api.hackthenorth.com/v3/events");
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }
  return res.json();
}
