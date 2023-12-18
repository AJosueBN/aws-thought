import React, { useState, useEffect } from 'react';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts, setThoughts] = useState([]);

  // The useEffect hook that runs method to allow to make a HTTP request to all the user's thoughts at the 'api/users' endpoint using the fetchData function
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/users');
        const jsonData = await res.json();
        const _data = jsonData.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1,
        );
        setThoughts([..._data]);
        setIsLoaded(true);
      } catch (error) {
        console.log(error); // Error occurred if the web service or useEffect method doesn't work
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          <ThoughtForm />
        </div>
        <div className={`col-12 mb-3 `}>
          {!isLoaded ? (
            <div>Loading...</div>
          ) : (
              <ThoughtList thoughts={thoughts} setThoughts={setThoughts} title="Some Feed for Thought(s)..." />
            )}
        </div>
      </div>
    </main>
  );
};

export default Home;
