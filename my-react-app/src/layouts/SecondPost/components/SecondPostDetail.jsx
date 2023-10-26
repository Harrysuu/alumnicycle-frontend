import React, { useEffect, useState } from 'react';
import { Card} from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function SecondPostDetail(props){
    const [detail,setDetail]=useState({});

    const getDetail = async ()=>{
        const res = await axios.get('/secondPost/getCommodityById?id='+props.match.params.id);
        if(res.data.res === 1){
            let _d = res.data.result || {};
            setDetail({..._d});
        }
        
    }

    useEffect(()=>{
        getDetail();
    },[])

    function getCategoryName(category) {
        switch (category) {
          case 1:
            return "Articles for daily use";
          case 2:
            return "Electronic goods";
          case 3:
            return "Clothing";
          default:
            return "All Second Posts"; // 处理未知的类别值
        }
      }

    return (<div>
        <Card className="mb-3" style={{ width: '50rem' }}>
        <Card.Body>
          {detail ? (
            <div>
              <h1>{detail.title}</h1>

              {detail.picture && (
                <img
                  src={`/common/download?name=${detail.picture}`}
                  alt='UniTrade Post'
                  style={{ maxWidth: '400px', maxHeight: '300px' }}
                />
              )}

              <div className="mb-4"></div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/catagoryLogo.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>Category: {getCategoryName(detail.category)}</Card.Text>
              </div>

              <div className="mb-2"></div>
              

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/commodity.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>CommodityName: {detail.commodityName}</Card.Text>
              </div>

              {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/count.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>count: {detail.count}</Card.Text>
              </div> */}

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/createTime.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>createTime: {detail.createTime}</Card.Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/newness.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>newness: {detail.newness}</Card.Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/price.png" alt="" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                <Card.Text>price: {detail.price}AU</Card.Text>
              </div>



              <div className="mb-2"></div>
              <div className="mb-2"></div>
              
                
            </div>
          ) : (
            <p>Loading...</p>
          )}


          <div className="mb-2"></div>

        </Card.Body>
      </Card>
    </div>)
};

export default withRouter(SecondPostDetail);