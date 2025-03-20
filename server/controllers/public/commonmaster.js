'use strict';
const fetch = require('node-fetch');
const config = require('..//..//helpers//config.js');
const Util = require('..//..//helpers//util.js');
const DEFAULT_API_SERVER = Util.getDefaultAPIServer();

exports.ImageFromDB = async function(req,res,err) {  //Used for brand and customer images
    return res.status(404).json({
        "status": 404,
        "internal": 4044,
        "message": "The image you are looking for does not exists on the system"
    })
};

exports.viewNSSQL = async (req, res) => {
    let query = "select * from "+ req.body.tbl;
    let whereCondition = req.body.where||'';
    let apiServer = (req.body.apiserver||DEFAULT_API_SERVER);

    if(req.body.tbl == 'warehouse-po'){
        if(apiServer == 'PROD'){
            query=`SELECT
                    tran.trandate AS OrderDate,
                    tran.id AS PurchaseOrderID,
                    tran.tranid AS PONumber,
                    vendor.entityid AS VendorName,
                    BUILTIN.DF(tran.memo) AS TotalAmount,
                    BUILTIN.DF(tran.status) AS Status,
                    tran.duedate AS DueDate,
                    SUM(line.quantity / item.custitemcase_pack) AS TotalQuantity,
                    CASE WHEN tran.duedate < CURRENT_DATE -1 THEN '1' ELSE '2' END AS tab,
                    NVL(ch.name,'5:00 PM') as ExpectedTime
                FROM  transaction AS tran
                JOIN  entity AS vendor ON tran.entity = vendor.id
                JOIN transactionline AS line ON tran.id = line.transaction
                JOIN item AS item ON line.item = item.id
                left join customlist_delivery_hours as ch on ch.id=tran.custbody_time_of_delivery
                WHERE tran.type = 'PurchOrd' and tran.duedate is not null
                and BUILTIN.DF( tran.status ) in ('Purchase Order : Pending Receipt')
                and tran.duedate <= CURRENT_DATE
                GROUP BY tran.id, tran.tranid, tran.trandate, tran.entity, vendor.entityid,
                    BUILTIN.DF(tran.memo), tran.status, tran.duedate, BUILTIN.DF(tran.status),ch.name
                ORDER BY tran.duedate DESC,TO_DATE(NVL(ch.name,'5:00 PM'),'hh:mi AM'),tran.trandate desc`;
        }
        else{
            query=`SELECT
                tran.trandate AS OrderDate,
                tran.id AS PurchaseOrderID,
                tran.tranid AS PONumber,
                vendor.entityid AS VendorName,
                BUILTIN.DF(tran.memo) AS TotalAmount,
                BUILTIN.DF(tran.status) AS Status,
                tran.duedate AS DueDate,
                SUM(line.quantity / item.custitemcase_pack) AS TotalQuantity,
                CASE WHEN tran.duedate < CURRENT_DATE -1 THEN '1' ELSE '2' END AS tab,
                NVL(ch.name,'5:00 PM') as ExpectedTime
            FROM  transaction AS tran
            JOIN  entity AS vendor ON tran.entity = vendor.id
            JOIN transactionline AS line ON tran.id = line.transaction
            JOIN item AS item ON line.item = item.id
            left join customlistdelivery_hours as ch on ch.id=tran.custbodytime_of_delivery
            WHERE tran.type = 'PurchOrd' and tran.duedate is not null
            and BUILTIN.DF( tran.status ) in ('Purchase Order : Pending Receipt')
            and tran.duedate <= CURRENT_DATE
            GROUP BY tran.id, tran.tranid, tran.trandate, tran.entity, vendor.entityid,
                BUILTIN.DF(tran.memo), tran.status, tran.duedate, BUILTIN.DF(tran.status),ch.name
            ORDER BY tran.duedate DESC,TO_DATE(NVL(ch.name,'5:00 PM'),'hh:mi AM'),tran.trandate desc`;
        }
        
    }
    //and BUILTIN.DF( tran.status ) not in ('Purchase Order : Pending Bill','Purchase Order : Closed')

    if(whereCondition != ''){
        query += " where "+ whereCondition;
    }
    const methodType = 'POST'
    let requestURL = Util.getBaseSuiteQLURL(apiServer);
    let headers = Util.createOAuthHeader(requestURL, methodType,apiServer);
    
    const payload = JSON.stringify({
        q: query
    });
    console.log(requestURL);
    console.log(payload);
    try{
        const response = await fetch(requestURL, {
                            headers: headers,
                            method: methodType,
                            body: payload
                        });

        const data = await response.json();

        // Check if 'data' is an array, and if not, make it an array
        if (data.items && Array.isArray(data.items)) 
        {
            return res.status(200).json(data.items);
        }
        else{
            console.log("Data is not in list format");
            return res.status(400).send({"status":400,"error":"Error while reading "});
        }
    }
    catch(err){
        console.error(err);
        return res.status(400).send({"status":400,"error":"Error while reading "});
    }
}


async function viewNetSuiteData(netSuiteTableName,apiServer){
    let allData = [];
    let errorMessage = null;
    const methodType = 'POST';
    let requestURL = Util.getBaseSuiteQLURL(apiServer);

    let hasMoreRecord = true;
    while(hasMoreRecord){
        let query = '';
        let whereCondition = '';
        if(netSuiteTableName.toUpperCase() == "WAREHOUSE-PO"){
            if(req.body.tbl == 'warehouse-po'){
                query=`SELECT  tran.trandate AS OrderDate,
                            tran.id AS PurchaseOrderID,
                            tran.tranid AS PONumber,
                            vendor.entityid AS VendorName,
                            tran.foreigntotal AS TotalAmount,
                            BUILTIN.DF( tran.status ) AS Status,
                            tran.duedate AS DueDate,
                            SUM(line.quantity) AS TotalQuantity
                        FROM transaction AS tran
                        JOIN entity AS vendor ON tran.entity = vendor.id
                        JOIN transactionline AS line ON tran.id = line.transaction
                        WHERE tran.type = 'PurchOrd'
                        GROUP BY tran.id, tran.tranid, tran.trandate, tran.entity, vendor.entityid, 
                            tran.foreigntotal, tran.status, tran.duedate,BUILTIN.DF( tran.status )
                        ORDER BY tran.trandate desc, tran.duedate DESC`;
            }
        }
        else{
            if(allData.length > 0){
                // whereCondition = " Where ID >"+ allData[allData.length - 1].id;
                await Util.sleep(500); 
            }

            query = "SELECT * FROM "+ netSuiteTableName +  whereCondition;
        }
        console.log("viewNetSuiteData function => ", query);

        console.log(requestURL);
        let headers = Util.createOAuthHeader(requestURL, methodType,apiServer);
        const payload = JSON.stringify({
            q: query
        });
        try{
            const response = await fetch(requestURL, {
                                headers: headers,
                                method: methodType,
                                body: payload
                            });
            
            const data = await response.json();
            if(response.status == 400 || response.status == 401){
                console.error(data);
                errorMessage = "Error while fetching data";
                if(data["o:errorDetails"]){
                    if(data["o:errorDetails"][0].detail){
                        errorMessage = data["o:errorDetails"][0].detail;
                    }
                }
                hasMoreRecord = false;
            }
            else{
                //console.log(data.links);
                console.log("count =>", data.count);
                if(data.hasMore !== true) {
                    hasMoreRecord = false;
                }
                else{
                    if(netSuiteTableName.toUpperCase() != "CUSTOMERADDRESS"){
                        data.links.forEach((d)=>{
                            if(d.rel == 'next'){
                                requestURL = d.href;
                            }
                        });
                    }
                    // Next url failed with ERROR : Invalid login attempt. For more details, see the Login Audit Trail in the 
                    //  NetSuite UI at Setup > Users/Roles > User Management > View Login Audit Trail.
                }
                // Check if 'data' is an array, and if not, make it an array
                if (data.items && Array.isArray(data.items)) 
                {
                    allData = [...allData,...data.items];
                }
                else{
                    errorMessage = "Data is not in list format";
                }
            }
            //Warning HEMANG => Comment below line after testing
            //hasMoreRecord = false;
        }
        catch(err){
            console.error(err);
            errorMessage = "Error while fetching data";
            hasMoreRecord = false;
        }
    }

    return {errorMessage, allData}
}
exports.viewNetSuiteData = viewNetSuiteData;