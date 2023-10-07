import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import axios from 'axios';
import Pagination from '../../Pagination/Pagination';
import { useMemo } from 'react'

function AnnouncementPage() {
  // var pageData = [];
  var [pageData, setPageData] = useState([]);
  // var pageIndex = 0;
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10; // 每页显示的数据数量

  // const columns = [
  //   // 列定义，可以根据您的Announcement对象属性进行定义
  //   {
  //     Header: 'ID',
  //     accessor: 'id',
  //   },
  //   {
  //     Header: 'Title',
  //     accessor: 'title',
  //   },
  //   {
  //     Header: 'Content',
  //     accessor: 'content',
  //   },
  //   {
  //     Header: 'Post Time',
  //     accessor: 'postTime',
  //   },
  //   {
  //     Header: 'Star',
  //     accessor: 'star',
  //   },
  // ];

  const datainfo = useMemo(
    () => [
      {
        name: '蒋铁柱',
        address: '北京市海淀区西三环中路19号',
        date: '2022-07-01',
        order: '1596694478675759682'
      },
      {
        name: '陈成功',
        address: '湖北武汉武昌区天子家园',
        date: '2022-06-27',
        order: '1448752212249399810'
      },
      {
        name: '宋阿美',
        address: '湖北武汉武昌区天子家园',
        date: '2022-06-21',
        order: '1171859737495400477'
      },
      {
        name: '张小乐',
        address: '北京市海淀区北航南门',
        date: '2022-06-30',
        order: '1096242976523544343'
      },
      {
        name: '马国庆',
        address: '北京市海淀区花园桥东南',
        date: '2022-06-12',
        order: '1344783976877111376'
      },
      {
        name: '小果',
        address: '广州天河机场西侧停车场',
        date: '2022-06-07',
        order: '1505069508845600364'
      }
    ],
    []
  )

  const columns = useMemo(
    () => [
      {
        Header: '订单编号',
        accessor: 'order'
      },
      {
        Header: '姓名',
        accessor: 'name'
      },
      {
        Header: '收货地址',
        accessor: 'address'
      },
      {
        Header: '下单日期',
        accessor: 'date'
      }
    ],
    []
  )

  // 使用react-table的hook来创建表格
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // state:{pageSize,pageIndex},
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageCount,
  } = useTable(
    {
      columns,
      data: datainfo,
      initialState: { pageSize: pageSize },
    },
    // usePagination
  );

  // 发送POST请求获取Announcement数据
  // useEffect(() => {
  //   axios
  //     .post('/announcement/page', { page: pageIndex + 1, pageSize })
  //     .then((response) => {
  //       // 更新表格数据
  //       setPageData(response.data.records); // 根据您的后端返回的数据结构进行修改
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, [pageIndex, pageSize]);

  return (
    // <div>
    //   here
    // </div>
    <div>
      {/* 表格 */}
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        {/* <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody> */}
        <tbody {...getTableBodyProps()}>
      
        + {page.map((row) => {    
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
        </tbody>

      </table>

      {/* 使用Pagination组件 */}
      <Pagination
        pageIndex={pageIndex}
        pageCount={pageCount}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        // previousPage={previousPage}
        // nextPage={nextPage}
        previousPage={() => {
          if (canPreviousPage) {
            setPageIndex(pageIndex - 1);
          }
        }}
        nextPage={() => {
          if (canNextPage) {
            setPageIndex(pageIndex + 1);
          }
        }}
      />
    </div>
  );
}

export default AnnouncementPage;
