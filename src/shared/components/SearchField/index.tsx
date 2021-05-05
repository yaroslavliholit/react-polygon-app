import React, {memo} from 'react';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from './styles';

const SearchField = () => {
    const cn = useStyles();

    return (
        <div className={cn.searchWrapper}>
            <TextField
                fullWidth
                variant="outlined"
                className={cn.searchField}
                placeholder={'Search symbols or companies'}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position={'start'}>
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    classes:{notchedOutline:cn.searchField}
                }}
            />
        </div>
    )
};

export default memo(SearchField);
