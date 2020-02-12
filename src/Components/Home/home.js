import React, {useState} from 'react';
import Header from '../Header/Header';
import Search from '../Search/Search';
import {fetchRepos} from '../SearchFunc';
import Repos from '../Repos/Repos'
import { Box } from '@material-ui/core';
import Loader from '../Loader/Loader'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [showBookmark, setShowBookmark] = useState(false);

  const bookmarkToggle = () => {
    setShowBookmark(!showBookmark);
  }

  const searchRepos = (language, stars, searchText, selectedLabel) => {
    setIsLoading(true);
    fetchRepos(language, stars, searchText, selectedLabel)
      .then((data) => {
        setIsLoading(false);
        setRepos(data.items);
        console.log("data.items", data.items);
      })
  }

  return (
    <>
      <Header />
      <Box mt={5}>
        <Search bookmarkToggle={bookmarkToggle} searchRepos={searchRepos}/>
      </Box>
      <Box mt={6}>
        {isLoading? <Loader />:<Repos showBookmark={showBookmark} repos={repos.sort((a, b) => a.stargazers_count>b.stargazers_count)} />}
      </Box>
    </>
  );
}
 
export default Home;