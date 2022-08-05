import type { SearchResult } from "../types";

const SECRET_KEY = "c86acea67e3f438c83308bdd261277b5";

export const getSearchResults = async (query: string): Promise<SearchResult[]> => {
  let searchResults: SearchResult[] = [];

  const headers = new Headers();
  headers.append("Ocp-Apim-Subscription-Key", SECRET_KEY);

  const requestOptions = {
    method: 'GET',
    headers,
  };

  const response = await fetch(`https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}&count=5`, requestOptions)
  const json = await response.json()

  console.log(json.webPages)
  console.log(json.webPages.value)
  console.log(json.webPages.value[0])

  json.webPages.value.forEach(item => {
    searchResults.push({ title: item.name, description: item.snippet, link: item.displayUrl })
  });

  return searchResults;
}

export const getLocalNews = async (): Promise<SearchResult[]> => {
  let news: SearchResult[] = [];

  const headers = new Headers();
  headers.append("Ocp-Apim-Subscription-Key", SECRET_KEY);

  const requestOptions = {
    method: 'GET',
    headers,
  };

  const response = await fetch("https://api.bing.microsoft.com/v7.0/news/search?q=dhaka&count=4", requestOptions)
  const json = await response.json()

  json.value.forEach(item => {
    news.push({ title: item.name, description: item.description, link: item.url })
  });

  return news;
}