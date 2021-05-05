import React, {memo} from 'react';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from './styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useSearchTickers from "../../../hooks/useSearchTickers";

const SearchField = () => {
    const cn = useStyles();
    const {
        isSearchEmpty,
        searchQuery,
        suggestions,
        handleSelectSuggestion,
        handleChangeSearchQuery
    } = useSearchTickers();

    return (
        <div className={cn.searchWrapper}>
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
                    classes:{notchedOutline:cn.searchField}
                }}
            />
            <div className={cn.suggestionsWrapper}>
                <List>
                    {isSearchEmpty && (
                        <ListItem>No Results found</ListItem>
                    )}
                    {searchQuery && suggestions.map(e => (
                        <ListItem key={e.ticker} className={cn.suggestionItem} onClick={handleSelectSuggestion(e.ticker)}>
                            <div className={cn.suggestionTicker}>
                                <ListItemText>{e.ticker}</ListItemText>
                            </div>
                            <div className={cn.suggestionName}>
                                <ListItemText className={cn.clip}>{e.name}</ListItemText>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </div>

        </div>
    )
};

export default memo(SearchField);
