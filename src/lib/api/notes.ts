export const getNotes = async (): Promise<string[]> => {
  let notes: string[] = [];



  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'GET',
    headers,
  };

  const response = await fetch(`https://­megan-backend.herokua­pp.com/notes/v1?userId=${encodeURIComponent("7cabf97f-5ad1-4a2a-b24b-b9e0e7d8571c")}&token=test`, requestOptions)

  const json = await response.json()
  json.forEach((item) => {
    notes.push(item.note)
  });

  return notes;
}

export const addNote = async (note: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    token: "test",
    userId: "7cabf97f-5ad1-4a2a-b24b-b9e0e7d8571c",
    note: note
  });

  const requestOptions = {
    method: 'POST',
    headers,
    body: raw,
  };

  return fetch("https://­megan-backend.herokua­pp.com/notes/v1/add", requestOptions)
}
