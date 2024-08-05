import { useState } from 'react'
import { Button, VideoTimeLine, ScrollBoard } from 'react-gonglu-design';
import './App.css'

function App() {
  const columnsHandleConfig = {
    columnWidth: [100, 200, 150, 150],
    indexHeader: '#',
    rowNum: 5,
    headerHeight: 60,
    hoverPause: true,
    carousel: 'single',
    // evenRowBGC: "#fff",
    // oddRowBGC: "#fff",
    align: ['center', 'left', 'left', 'left'],
    columns: [
      {
        title: '矿山名称',
        dataIndex: 'mineName',
        ellipsis: true,
        render: (val: string) => <span>{val}span</span>,
      },
      {
        title: '问题类型',
        dataIndex: 'quesType',
        ellipsis: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        ellipsis: false,
      },
    ],
    dataSource: [
      {
        mineName: '哇哈哈1',
        quesType: '爽歪歪1',
        status: '乳酸菌',
      },
      {
        mineName: '哇哈哈2',
        quesType: '爽歪歪1',
        status: '乳酸菌',
      },
      {
        mineName: '哇哈哈3',
        quesType: '爽歪歪1',
        status: '乳酸菌',
      },
      {
        mineName: '哇哈哈4',
        quesType: '爽歪歪1',
        status: '乳酸菌',
      },
    ],
    waitTime: 6000,
    oddRowBorder: {
      border: 'none',
    },
    evenRowBorder: {
      border: 'none',
    },
    index: true,
    header: ['矿山名称', '问题类型', '状态'],
  };
  return (
    <>
      <Button>1111111111</Button>

      <div className={'container'}>
      <div className={'box'}>
        <ScrollBoard
          config={columnsHandleConfig}
          // onClick={(ri: any, ci: any, row: any, ceil: any) => {
          //   console.log(ri, ci, row, ceil, 'onClick');
          // }}
        />
      </div>
    </div>
    </>
  )
}

export default App
