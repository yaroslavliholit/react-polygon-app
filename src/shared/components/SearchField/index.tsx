import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { CircularProgress } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import useSearchTickers from '../../hooks/useSearchTickers';
import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg';
import useStyles from './styles';

const SearchField = () => {
  const cn = useStyles();
  const {
    isSearchEmpty,
    searchQuery,
    suggestions,
    handleSelectSuggestion,
    handleChangeSearchQuery,
    suggestionsLoading,
  } = useSearchTickers();

  return (
    <div className={cn.searchWrapper}>
      <div className={cn.menuButtonWrapper}>
        <MenuIcon />
      </div>
      <TextField
        fullWidth
        value={searchQuery}
        onChange={handleChangeSearchQuery}
        variant="outlined"
        className={cn.searchField}
        placeholder={'Search symbols or companies'}
        InputProps={{
          startAdornment: (
            <InputAdornment position={'start'}>
              <SearchIcon htmlColor={'#b6b7c3'} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position={'end'}>
              {suggestionsLoading && <CircularProgress />}
            </InputAdornment>
          ),
          classes: { notchedOutline: cn.searchField },
        }}
      />
      <div className={cn.suggestionsWrapper}>
        <List>
          {isSearchEmpty && <ListItem>No Results found</ListItem>}
          {searchQuery &&
            suggestions.map((e) => (
              <ListItem
                key={e.ticker}
                className={cn.suggestionItem}
                onClick={handleSelectSuggestion(e.ticker)}>
                <div className={cn.suggestionTicker}>
                  <ListItemText>{e.ticker}</ListItemText>
                </div>
                <div className={cn.suggestionName}>
                  <div className={cn.clip}>{e.name}</div>
                </div>
              </ListItem>
            ))}
        </List>
      </div>
    </div>
  );
};

export default memo(SearchField);
