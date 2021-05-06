import React, {useCallback} from 'react';
import withCommonLayout from "../../shared/hocs/withCommonLayout";
import {useHistory, useParams} from 'react-router-dom';
import useFetchTickerDetails from "../../hooks/useFetchTickerDetails";
import TagsList from '../../shared/components/TagsList';
import useStyles from './styles';

import { ReactComponent as DownArrow } from '../../shared/assets/icons/down-arrow.svg';
import { ReactComponent as UpArrow } from '../../shared/assets/icons/up-arrow.svg';

const SymbolDetailsPage = () => {
    const history = useHistory();
    const cn = useStyles();

    const { id } = useParams<{ id: string }>();
    const { tickerDetails, lastAvailablePrice, priceDifference, changePercent } = useFetchTickerDetails(id);

    const handleSelectSuggestion = useCallback((ticker: string) => {
        history.push(`/symbol/${ticker}`);
    }, [history]);

    const companyInfos = [
        {label: 'Selector:', description: tickerDetails?.sector},
        {label: 'Industry:', description: tickerDetails?.industry},
        {label: 'CEO:', description: tickerDetails?.ceo},
        {label: 'Employees:', description: tickerDetails?.employees},
    ];

    const isPositiveNumber = Math.sign(priceDifference || -1) !== -1;

    if (!tickerDetails) return null;

    return (
        <div className={cn.pageWrapper}>
            <div className={cn.header}>
                <div className={cn.headerInfoContainer}>
                    <div className={cn.symbolTitle}>{tickerDetails.symbol}</div>
                    <div>{tickerDetails.name}</div>
                </div>
                <div className={cn.headerInfoContainer}>
                    <div className={cn.priceTitle}>${lastAvailablePrice}</div>
                    <div>
                        <span className={isPositiveNumber ? cn.pricePositive : cn.priceLow}>{priceDifference}</span>
                        { isPositiveNumber ? <UpArrow /> : <DownArrow /> }
                        <span className={isPositiveNumber ? cn.pricePositive : cn.priceLow}>{changePercent}%</span>
                    </div>
                </div>
            </div>
            <section className={cn.pageSection}>
                <div className={cn.pageSectionItem}>
                    <h2 className={cn.pageSubTitle}>About {tickerDetails.symbol}</h2>
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
                            <div>{tickerDetails.hq_address}</div>
                            <div>{tickerDetails.phone}</div>

                        </div>
                    </div>
                </div>
            </section>
            <section className={cn.pageSection}>
                <div className={cn.pageSectionItem}>
                    <h2 className={cn.pageSubTitle}>Description</h2>
                    <div>{tickerDetails.description}</div>
                </div>
                <div className={cn.pageSectionItem}>
                    <TagsList
                        title={'Related Stocks'}
                        items={tickerDetails.similar}
                        colors={['#e51616', '#58d38c']}
                        onItemClick={handleSelectSuggestion}
                    />
                    <TagsList
                        title={'Tags'}
                        items={tickerDetails.tags}
                        colors={['#8b40cb', '#5887d3']}
                    />
                </div>
            </section>
        </div>
    );
};

export default withCommonLayout(SymbolDetailsPage);
