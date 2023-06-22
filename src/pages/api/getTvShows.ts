
import { NextApiRequest, NextApiResponse } from 'next';

export default async function moviesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page } = req.query;

  try {
    const apiKey = process.env.API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_count.desc&api_key=${apiKey}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.log('Error fetching tv shows data:', error);
    res.status(500).json({ error: 'Error fetching tv shows data' });
  }
}