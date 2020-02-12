import React, { useState } from 'react';
import { Grid, Box, Paper, Typography } from '@material-ui/core';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import Bookmark from '@material-ui/icons/Bookmark';
import OpenInNew from '@material-ui/icons/OpenInNew';
import { format } from 'date-fns'
import Star from '@material-ui/icons/Star';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import './Repos.css'

const RenderCards = ({repo, owner, description, created_at, language, open_issues, stargazers_count, name, html_url, id, bookmarkedRepos, setBookmarkToggler, showBookmark, bookmarkToggler}) => {
  const [bookmarkShow, setBookmarkShow] = useState(bookmarkedRepos[id] ? true : false);

  const addTorepo = () => {
    if(!localStorage.getItem('repos')){
      localStorage.setItem('repos', JSON.stringify({}));
    }
    let localRepo = JSON.parse(localStorage.getItem('repos'));
    localRepo[id] = repo;
    localStorage.setItem('repos', JSON.stringify(localRepo));
    setBookmarkShow(true);
  }

  const removeFromRepo = () => {
    let localRepo = JSON.parse(localStorage.getItem('repos'));
    delete localRepo[id];
    localStorage.setItem('repos', JSON.stringify(localRepo));
    setBookmarkShow(false);
    if(showBookmark){
      setBookmarkToggler(!bookmarkToggler);
    }
  }

  return(
      <Paper elevation={3} style={{height: 320, position:"relative"}}>
        <Box p={2}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={8}>
                  <Grid container>
                    <Box mr={2} borderRadius={17}>
                      <img 
                        width="35"
                        height="35" 
                        src={owner.avatar_url}
                        style={{borderRadius:'8px'}}
                        alt={name}
                      />
                    </Box>
                    <Grid item>
                      <Typography variant="subtitle2" component="h2" color="textSecondary">
                        <Box fontWeight={800}>
                          <a href={owner.html_url} target="blank" className="link-style">
                            {owner.login}
                          </a>
                        </Box>
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        <a href={owner.html_url} target="blank" className="link-style">
                          Visit profile
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid> 
                  <Box mr={0.25}>
                    <Grid item xs={1}>
                      {!bookmarkShow?(<BookmarkBorder
                                        onClick={addTorepo}
                                      />)
                                        :(<Bookmark
                                            onClick={removeFromRepo}
                                          />)}
                    </Grid>
                  </Box>
                <Grid item xs={1}>
                  <a href={html_url} target="blank" className="link-style">
                    <OpenInNew />
                  </a>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box mt={1}>
                <Typography style={{color:'#007bff'}}>
                  <Box fontWeight={800}>
                    <a href={html_url} target="blank" className="link-style">
                      {name}
                    </a>
                  </Box>
                </Typography>
              </Box>
            </Grid>
              <Grid item xs={12}>
                <Box mt={1}>
                  <Grid container>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Build By 
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2" color="textSecondary">
                          {owner.login}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2" color="textSecondary">
                          {format(new Date(created_at), 'dd MMM, yyyy')}
                        </Typography>
                      </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mt={1}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {description}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} style={{position:"absolute", bottom:15}}>
                {language} <Star style={{fontSize: 15}}/> {stargazers_count} <ErrorOutline style={{fontSize: 15}}/> {open_issues}
              </Grid>
          </Grid>
        </Box>
      </Paper>
    )
}

const Repos = (props) => {
  const [bookmarkToggler, setBookmarkToggler] = useState(false);

  let repoList = props.repos.slice(0, 10);

  let bookmarkedRepos = JSON.parse(localStorage.getItem('repos')) ? JSON.parse(localStorage.getItem('repos')) : {};

  if(props.showBookmark){
    repoList = Object.values(JSON.parse(localStorage.getItem('repos')));
  }

  return (
    repoList.length ? (
      <Grid container spacing={2}>
        {repoList.map((repo) =>
          (
            <Grid item key={repo.id} sm={12} md={3}>    
              <RenderCards
                bookmarkedRepos={bookmarkedRepos}
                showBookmark={props.showBookmark}
                setBookmarkToggler={setBookmarkToggler}
                bookmarkToggler={bookmarkToggler}
                repo={repo}
                {...repo}
              />
            </Grid>
          ))
        }
      </Grid>
    ) : (<div style={{textAlign: "center"}}>NO REPOSITORY</div>)
  );
}
 
export default React.memo(Repos);