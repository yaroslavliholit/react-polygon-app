import React, {memo} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import useTrimText from '../../../hooks/useTrimText';
import useStyle from './styles';

interface Props {
    text: string;
}

const ShowMoreText = ({text}: Props) => {
    const {trimmedText, shouldTrimText, isTextTrimmed, handleToddleCropText} = useTrimText(text);
    const cn = useStyle();

    return (
        <>
            <Typography variant={'body1'}>{trimmedText}</Typography>
            {shouldTrimText && (
                <div className={cn.buttonWrapper}>
                    <Button onClick={handleToddleCropText}>
                        {isTextTrimmed ? <ExpandMoreIcon /> : <ExpandLessIcon /> }
                    </Button>
                </div>
            )}
        </>
    )
};

export default memo(ShowMoreText);
