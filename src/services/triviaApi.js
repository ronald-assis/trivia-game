const fetchTriviaApi = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((data) => data.json());
  return response;
};

export default fetchTriviaApi;
