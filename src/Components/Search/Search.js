import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types'
import NativeSelect from '@material-ui/core/NativeSelect';
import languages from '../../assets/lang.json'
import Bookmark from '@material-ui/icons/Bookmark';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';

// make showbookmark icon toggle

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
}

const Search = ({searchRepos, bookmarkToggle}) => {
  const [searchText, setSearch] = useState("");
  const [language, setLanguage] = useState("");
  const [label, setLabel] = useState('good-first-issue');
  const [stars, setStar] = useState(200);
  const [bookmark, setBookmark] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRepos(language, stars, searchText, label);
  }

  return (
    <>
      <Box pt={3} pb={3} style={{backgroundColor:"#e9ecef"}}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={8}>
                      <TextField 
                        label="Search..." 
                        variant="filled"
                        value={searchText}
                        onChange={(e) => setSearch(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <Box ml={1} mt={1}>
                        <Button 
                          variant="contained"
                          size="large"
                          style={{backgroundColor:'#6c757d', color:'white'}}
                          type="submit"
                        >
                          Explore
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <Box ml={1} mt={1}>
                        <Button 
                          variant="contained" 
                          size="large"
                          style={{backgroundColor: '#FAFAFA', borderRadius:'50%'}}
                          onClick={() => {bookmarkToggle(); setBookmark(!bookmark)}}
                        >
                          {bookmark? <Bookmark /> : <BookmarkBorder />}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <Box mt={2}>
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={4}>
                        <Typography gutterBottom>max stars:</Typography>
                        <Slider
                          ValueLabelComponent={ValueLabelComponent}
                          aria-label="custom thumb label" 
                          value={stars}
                          onChange={(e, newValue) => setStar(newValue)}
                          min={0}
                          max={1000}
                        />
                      </Grid>
                      <Grid item sm={12} md={4}>
                        <Typography gutterBottom>languages:</Typography>
                        <NativeSelect
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          fullWidth
                        >
                          <option value="">All Languages</option>
                          {languages.map((ele, index)=><option key={index} value={ele.value}>{ele.label}</option>)}
                        </NativeSelect>
                      </Grid>
                      <Grid item sm={12} md={4}>
                        <Typography gutterBottom>Label:</Typography>
                        <NativeSelect
                          value={label}
                          onChange={(e) => setLabel(e.target.value)}
                          fullWidth
                        >
                          <option value="good-first-issue">Good First Issue</option>
                          <option value="help-wanted-issue">Help Wanted Issue</option>
                        </NativeSelect>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
 
export default Search;