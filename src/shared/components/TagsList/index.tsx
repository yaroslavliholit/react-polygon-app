import React, {memo} from 'react';
import useStyles from './styles';

interface Props {
    title: string;
    items?: string[];
    colors: string[];
    onItemClick?: (id: string) => void;
}

const TagsList = ({items, colors, title, onItemClick}: Props) => {
    const cn = useStyles();
    const [oddColor, evenColor] = colors;

    const handleItemClick = (id: string) => () => {
        if (onItemClick) {
            onItemClick(id);
        }
    };

    return (
        <>
            {Boolean(items?.length) && (
                <>
                    <h2>{title}</h2>
                    <div className={cn.tagsWrapper}>
                        {items?.map((e, index) => {
                            const isEvenItem = index % 2 === 0;
                            const backgroundColor = isEvenItem ? oddColor : evenColor;

                            return (
                                <div
                                    key={e}
                                    className={cn.tagItem}
                                    style={{ backgroundColor }}
                                    onClick={handleItemClick(e)}>{e}</div>
                            )
                        })}
                    </div>
                </>
            )}
        </>
    );
};

export default memo(TagsList);
