import { NextApiRequest, NextApiResponse } from 'next';

export default async function resultsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchTerm } = req.query;
  try {
    const searchMedia = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=${process.env.API_KEY}`
    );
    const searchResults = await searchMedia.json();
    console.log({ searchResults });

    res.status(200).json(searchResults);
  } catch (error) {
    console.log("Error fetching movie data:", error);
    res.status(500).json({ error: "Internal Server Error" }); 
  }
}