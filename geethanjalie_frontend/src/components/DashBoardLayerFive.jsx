import React from 'react'
import UnitCountFour from './child/UnitCountFour'
import RevenueStatisticsOne from './child/RevenueStatisticsOne'
import SalesStatisticTwo from './child/SalesStatisticTwo'
import TopCountriesTwo from './child/TopCountriesTwo'
import UserActivatesTwo from './child/UserActivatesTwo'
import LatestInvestmentsOne from './child/LatestInvestmentsOne'
import NoticeBoardOne from './child/NoticeBoardOne'
import TotalTransactionsOne from './child/TotalTransactionsOne'
import ProjectStatusOne from './child/ProjectStatusOne'

const DashBoardLayerFive = () => {
    const userRole = localStorage.getItem("role");
    return (
        <>
            <div className="row gy-4">
            <RevenueStatisticsOne />
                {/* UnitCountFour */}
                {userRole === "admin" && (<UnitCountFour />)}

                {/* RevenueStatisticsOne */}



                {/* SalesStatisticTwo */}
                {/* <SalesStatisticTwo /> */}


                {/* TopCountriesTwo */}
                {/* <TopCountriesTwo /> */}


                {/* UserActivatesTwo */}
                {/* <UserActivatesTwo /> */}


                {/* LatestInvestmentsOne */}
                {/* <LatestInvestmentsOne /> */}

                {/* NoticeBoardOne */}
                {/* <NoticeBoardOne /> */}

                {/* TotalTransactionsOne */}
                {/* <TotalTransactionsOne /> */}

                {/* ProjectStatusOne */}
                {/* <ProjectStatusOne /> */}
            </div>

        </>
    )
}

export default DashBoardLayerFive