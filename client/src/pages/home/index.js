/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback, useRef } from 'react'; 
//import { Link } from 'react-router-dom'; //useNavigate
//import classNames from 'classnames';
import { useSite } from '../../context/sitecontext';
//import * as commonService from './../../services/common.js';
import * as publicCommonService from './../../services/public/common.js';
import Footer from  './../../common/footer.js';

const Home = (props) =>{
    const myTimer = useRef(null);
    const myTimerScroll = useRef(null);
    const dvPastDueOrder = useRef(null);
    const dvInboundOrder = useRef(null);
    const { setIsLoading  } = useSite();
    const [ inboundPO , setInboundPO] = useState([]);
    const [ duePO , setDuePO] = useState([]);
    const [ firstTimeLoaded, setFirstTimeLoaded] = useState(false)

    const fillData = ()=>{
        fillPurchaseOrders();
    }

    const divAutoScrollTimer = (clear)=>{
        if(clear){
            if(myTimerScroll.current != null){
                console.log("Auto scroll clear timer ");
                window.clearTimeout(myTimerScroll.current);
                myTimerScroll.current = null;
            }
        }
        else{
            if(myTimerScroll.current == null){
                console.log("Auto scroll  timer set ", new Date());
                myTimerScroll.current = setTimeout(()=>{scrollData()}, 4000);
            }
        }
    }

    const fillPurchaseOrders  = async()=>{
        divAutoScrollTimer(true);

        setIsLoading(true);
        const result = await publicCommonService.warhouseReceivingPO();
        if(result && result.length >0){
            result.forEach((d)=>{
                d.status = d.status.replace('Purchase Order :','').trim();
            })
            let inboundOrders = result.filter((x) => x.tab === '2');
            setInboundPO(inboundOrders);

            let dueOrders = result.filter((x) => x.tab !=='2');
            setDuePO(dueOrders);
        }
        setIsLoading(false);
        setFirstTimeLoaded(true);

        myTimer.current = setTimeout(()=>{fillData()}, 300000); //300000
        divAutoScrollTimer(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onLoadFillData = useCallback(fillData, []);
    useEffect(() => {
        onLoadFillData();
        return () => {
            if(myTimer.current){console.log("clear refresh data timer");
                window.clearTimeout(myTimer.current);
                myTimer.current = null;
            }
            if(myTimerScroll.current){console.log("clear scroll timer");
                window.clearTimeout(myTimerScroll.current);
                myTimerScroll.current = null;
            }
        };
    }, [onLoadFillData]);


    const scrollData = ()=>{
        //console.log("myTimerScroll.current ", myTimerScroll.current);
        if(myTimerScroll.current == null){
            console.log("Scroll interrupted"); return;
        }
        myTimerScroll.current = null;
        //console.log("scroll data called ", new Date());

        if(dvPastDueOrder.current.scrollTop != null){
            scrollDivVertically(dvPastDueOrder.current)
        }
        if(dvInboundOrder.current.scrollTop != null){
            scrollDivVertically(dvInboundOrder.current)
        }
        divAutoScrollTimer(false);
    }

    const scrollDivVertically = (dvCurrent)=>{
        let dvScreenHeight = dvCurrent.clientHeight; 
        let dvScrollHeight = dvCurrent.scrollHeight;
        let dvScrollPos = dvCurrent.scrollTop;
        let totalPosition = Math.ceil(dvScrollPos +  dvScreenHeight);
        //console.log(" div.scrollHeight ",dvScreenHeight ,  "   scrollTop ", dvScrollPos, "   div.clientHeight ", dvScrollHeight , " final Post ", totalPosition);
        if(totalPosition < dvScrollHeight) {
            dvCurrent.scrollTop += 38;
        }
        else{
            dvCurrent.scrollTop = 0;
        }
    }

    return (
    <>
        <div className="text-center">
            <div className="fnt30-w800">Warehouse Receiving Dashboard</div>
        </div>

        <div className="mt-2">

            <div className="card card-red">
                <div className="card-img-top fnt24 card-cust-title">{firstTimeLoaded && <span>{duePO.length}</span>} Past Due Orders</div>
                <div className="card-body">
                    <div ref={dvPastDueOrder}  className="overflow-auto border pt-0 mt-0" style={{maxHeight:'calc(50vh - 160px)',minHeight:'calc(50vh - 160px)'}}>
                        <table className="table table-hover stickyHeader stickyHeadergry">
                            <thead>
                                <tr className="fnt16-w500">
                                    <th>#</th>
                                    <th>Expected Delivery</th>
                                    <th>Expected Time</th>
                                    <th>PO Number</th>
                                    <th>VendorName</th>
                                    <th>Status</th>
                                    <th className="total text-end">Total Cases</th>
                                    <th className="total text-end">Memo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {duePO.map((item,index) =>
                                    <React.Fragment  key={'b_'+ item.purchaseorderid}>
                                        <tr key={item.item_id}>
                                            <td>{index + 1}</td>
                                            <td>{item.duedate}</td>
                                            <td>{item.expectedtime}</td>
                                            <td>{item.ponumber}</td>
                                            <td>{item.vendorname}</td>
                                            <td>{item.status}</td>
                                            <td className="price text-end">{item.totalquantity}</td>
                                            <td className="price text-end">{item.totalamount}</td>
                                        </tr>
                                    </React.Fragment>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>  

            <div className="card card-green mt-3">
                <div className="card-img-top fnt24 card-cust-title">{firstTimeLoaded && <span>{inboundPO.length}</span>} Inbound Purchase Orders</div>
                <div className="card-body">
                    <div ref={dvInboundOrder} className="overflow-auto border pt-0 mt-0" style={{maxHeight:'calc(50vh - 160px)',minHeight:'calc(50vh - 160px)'}}>
                        <table className="table table-hover stickyHeader stickyHeadergry">
                            <thead>
                                <tr className="fnt16-w500">
                                    <th>#</th>
                                    <th>Expected Delivery</th>
                                    <th>Expected Time</th>
                                    <th>PO Number</th>
                                    <th>VendorName</th>
                                    <th className="">Status</th>
                                    <th className="text-end">Total Cases</th>
                                    <th className="text-end">Memo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inboundPO.map((item,index) =>
                                    <React.Fragment  key={'b_'+ item.purchaseorderid}>
                                        <tr key={item.item_id}>
                                            <td>{index + 1}</td>
                                            <td>{item.duedate}</td>
                                            <td>{item.expectedtime}</td>
                                            <td>{item.ponumber}</td>
                                            <td>{item.vendorname}</td>
                                            <td>{item.status}</td>
                                            <td className="price text-end">{item.totalquantity}</td>
                                            <td className="price text-end">{item.totalamount}</td>
                                        </tr>
                                    </React.Fragment>
                                )}
                            </tbody>
                        </table>
                    </div> 
                </div>
            </div>
        </div>
        
        <Footer />
    </>
  );
}
export default Home