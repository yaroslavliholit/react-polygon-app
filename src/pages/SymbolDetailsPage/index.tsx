import React, {useCallback} from 'react';
import withCommonLayout from "../../shared/hocs/withCommonLayout";
import {useHistory, useParams} from 'react-router-dom';
import useFetchTickerDetails from "../../hooks/useFetchTickerDetails";
import TagsList from '../../shared/components/TagsList';
import useStyles from './styles';

const SymbolDetailsPage = () => {
    const history = useHistory();
    const cn = useStyles();

    const { id } = useParams<{ id: string }>();
    const { data } = useFetchTickerDetails(id);

    const handleSelectSuggestion = useCallback((ticker: string) => {
        history.push(`/symbol/${ticker}`)
    }, [history]);

    const companyInfos = [
        {label: 'Selector:', description: data?.sector},
        {label: 'Industry:', description: data?.industry},
        {label: 'CEO:', description: data?.ceo},
        {label: 'Employees:', description: data?.employees},
    ]

    if (!data) return null;

    return (
        <div className={cn.pageWrapper}>
            <div className={cn.header}>
                <div className={cn.headerInfoContainer}>
                    <div className={cn.symbolTitle}>{data.symbol}</div>
                    <div>{data.name}</div>
                </div>
                <div className={cn.headerInfoContainer}>
                    <div className={cn.priceTitle}>$677.32</div>
                    <div>
                        <span className={cn.priceLow}>-2.78</span>
                        <span className={cn.priceLow}>&#x2193;</span>
                        <span className={cn.priceLow}>1.5%</span>
                    </div>
                </div>
            </div>
            <section className={cn.pageSection}>
                <div className={cn.pageSectionItem}>
                    <h2 className={cn.pageSubTitle}>About {data.symbol}</h2>
                    <div className={cn.pageSection}>
                        <div className={cn.pageSectionItem}>
                            <ul className={cn.infoList}>
                                {companyInfos.map(e => (
                                    <li
                                        key={e.label}
                                        className={cn.infoListItem}>
                                        {e.label} <span className={cn.infoListItemValue}>{e.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={cn.pageSectionItem}>
                            {/* @ts-ignore */}
                            <div>{data.hq_address}</div>
                            <div>{data.phone}</div>

                        </div>
                    </div>
                </div>
            </section>
            <section className={cn.pageSection}>
                <div className={cn.pageSectionItem}>
                    <h2 className={cn.pageSubTitle}>Description</h2>
                    <div>{data.description}</div>
                </div>
                <div className={cn.pageSectionItem}>
                    <TagsList
                        title={'Related Stocks'}
                        items={data.similar}
                        colors={['#e51616', '#58d38c']}
                        onItemClick={handleSelectSuggestion}
                    />
                    <TagsList
                        title={'Tags'}
                        items={data.tags}
                        colors={['#8b40cb', '#5887d3']}
                    />
                </div>
            </section>
        </div>
    );
};

export default withCommonLayout(SymbolDetailsPage);
